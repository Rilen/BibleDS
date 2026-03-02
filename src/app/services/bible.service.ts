import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import {
    Book,
    Chapter,
    Verse,
    SearchResult,
    BibleVersion,
} from '../models/bible.models';

// Estrutura do JSON Local de Livro Pequeno (Sharded)
interface LocalBookIndex {
    name: string;
    slug: string;
    testament: 'VT' | 'NT';
    chapters: number;
}

type LocalChapterFlat = string[]; // array de versiculos

@Injectable({ providedIn: 'root' })
export class BibleService {
    private booksCache$?: Observable<Book[]>;
    private bookDataCache: Map<string, Observable<LocalChapterFlat[]>> = new Map();

    constructor(private http: HttpClient) { }

    getVersions(): Observable<BibleVersion[]> {
        const versions: BibleVersion[] = [
            { slug: 'am', label: 'Ave Maria (Local)', tradition: 'Católica' }
        ];
        return of(versions);
    }

    getBooks(): Observable<Book[]> {
        if (!this.booksCache$) {
            this.booksCache$ = this.http.get<LocalBookIndex[]>('data/books_index.json').pipe(
                map(indices => indices.map(idx => ({
                    abbrev: { pt: idx.slug, en: idx.slug },
                    author: 'Vários',
                    chapters: idx.chapters,
                    comment: '',
                    group: idx.testament === 'VT' ? 'Antigo Testamento' : 'Novo Testamento',
                    name: idx.name,
                    testament: idx.testament
                } as Book))),
                shareReplay(1)
            );
        }
        return this.booksCache$;
    }

    // Método para carregar um livro específico (Lazy Loading)
    private getLocalBook(slug: string): Observable<LocalChapterFlat[]> {
        if (!this.bookDataCache.has(slug)) {
            const obs = this.http.get<LocalChapterFlat[]>(`data/books/${slug}.json`).pipe(
                shareReplay(1),
                catchError(err => {
                    console.error(`Erro ao carregar livro: ${slug}`, err);
                    return throwError(() => new Error(`Falha ao carregar livro "${slug}".`));
                })
            );
            this.bookDataCache.set(slug, obs);
        }
        return this.bookDataCache.get(slug)!;
    }

    getChapter(version: string, bookSlug: string, chapter: number): Observable<Chapter> {
        return this.getBooks().pipe(
            map(books => books.find(b => b.abbrev.pt === bookSlug || this.normalizeSlug(b.name) === bookSlug)),
            map(book => {
                if (!book) throw new Error(`Livro "${bookSlug}" não encontrado.`);
                return book;
            }),
            switchMap(book => this.getLocalBook(book.abbrev.pt).pipe(
                map(chapters => {
                    const chapterData = chapters[chapter - 1];
                    if (!chapterData) throw new Error(`Capítulo ${chapter} não encontrado.`);

                    return {
                        book: { ...book },
                        chapter: { number: chapter, verses: chapterData.length },
                        verses: chapterData.map((text, idx) => ({
                            number: idx + 1,
                            text: text
                        }))
                    } as unknown as Chapter;
                })
            ))
        );
    }

    // Para busca e analytics pesado, carregamos o arquivo original completo (se necessário)
    // ou mantemos o ave_maria.json original apenas para essas operações "on-demand"
    public getLocalBible(): Observable<any> {
        return this.http.get<any>('data/ave_maria.json').pipe(
            shareReplay(1)
        );
    }

    searchVerses(query: string, version: string = 'am'): Observable<SearchResult> {
        const normalizedQuery = query.toLowerCase();
        return this.getLocalBible().pipe(
            map(bible => {
                const results: any[] = [];
                const allBooks = [...bible.vt, ...bible.nt];

                for (const book of allBooks) {
                    for (const chapter of book.c) {
                        for (const verse of chapter.v) {
                            if (verse.t.toLowerCase().includes(normalizedQuery)) {
                                results.push({
                                    book: { name: book.n, abbrev: { pt: this.normalizeSlug(book.n) } },
                                    chapter: chapter.i,
                                    number: verse.i,
                                    text: verse.t
                                });
                            }
                            if (results.length >= 50) break;
                        }
                        if (results.length >= 50) break;
                    }
                    if (results.length >= 50) break;
                }

                return {
                    occurrence: results.length,
                    version: 'am',
                    verses: results
                } as SearchResult;
            })
        );
    }

    getRandomVerse(version: string = 'am'): Observable<Verse> {
        return this.getBooks().pipe(
            map(books => books[Math.floor(Math.random() * books.length)]),
            switchMap(book => this.getLocalBook(book.abbrev.pt).pipe(
                map(chapters => {
                    const chIndex = Math.floor(Math.random() * chapters.length);
                    const chapter = chapters[chIndex];
                    const vIndex = Math.floor(Math.random() * chapter.length);
                    const verseText = chapter[vIndex];

                    return {
                        book: { ...book },
                        chapter: chIndex + 1,
                        number: vIndex + 1,
                        text: verseText
                    } as unknown as Verse;
                })
            ))
        );
    }

    private normalizeSlug(text: string): string {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');
    }
}
