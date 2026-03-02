import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, timeout } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
    Book,
    Chapter,
    Verse,
    SearchResult,
    BibleVersion,
    BibleVersionSlug,
} from '../models/bible.models';

// Estrutura do JSON Local (Ave-Maria)
interface LocalVerse {
    versiculo: number;
    texto: string;
}

interface LocalChapter {
    capitulo: number;
    versiculos: LocalVerse[];
}

interface LocalBook {
    nome: string;
    capitulos: LocalChapter[];
}

interface LocalBible {
    antigoTestamento: LocalBook[];
    novoTestamento: LocalBook[];
}

@Injectable({ providedIn: 'root' })
export class BibleService {
    private readonly base = environment.apiBaseUrl;
    private booksCache$?: Observable<Book[]>;
    private localBibleData$?: Observable<LocalBible>;

    constructor(private http: HttpClient) { }

    private handleError(operation: string) {
        return (error: any): Observable<never> => {
            console.error(`${operation} failed:`, error);
            let message = 'Ocorreu um erro na comunicação com o servidor bíblico.';

            if (error instanceof HttpErrorResponse) {
                if (error.status === 403) {
                    message = 'Limite de requisições excedido ou acesso negado. (20 req/hora em modo anônimo).';
                } else if (error.status === 0) {
                    message = 'Falha na conexão com a Internet. Verifique sua rede.';
                }
            }

            return throwError(() => new Error(message));
        };
    }

    getVersions(): Observable<BibleVersion[]> {
        return this.http.get<BibleVersion[]>(`${this.base}/versions`).pipe(
            timeout(10000),
            catchError(this.handleError('getVersions'))
        );
    }

    getBooks(): Observable<Book[]> {
        if (!this.booksCache$) {
            this.booksCache$ = this.http.get<Book[]>(`${this.base}/books`).pipe(
                timeout(10000),
                map(books => books.map(b => ({ ...b, testament: b.testament.toUpperCase() as any }))),
                shareReplay(1),
                catchError(this.handleError('getBooks'))
            );
        }
        return this.booksCache$;
    }

    private getLocalBible(): Observable<LocalBible> {
        if (!this.localBibleData$) {
            this.localBibleData$ = this.http.get<LocalBible>('data/ave_maria.json').pipe(
                shareReplay(1),
                catchError(err => {
                    console.error('Erro ao carregar Bíblia Local', err);
                    return throwError(() => new Error('Falha ao carregar base de dados local.'));
                })
            );
        }
        return this.localBibleData$;
    }

    getChapter(version: string, bookSlug: string, chapter: number): Observable<Chapter> {
        if (version === 'am') {
            return this.getLocalChapter(bookSlug, chapter);
        }
        return this.http.get<Chapter>(`${this.base}/verses/${version}/${bookSlug}/${chapter}`).pipe(
            timeout(10000),
            catchError(this.handleError('getChapter'))
        );
    }

    private getLocalChapter(bookSlugOrName: string, chapterNum: number): Observable<Chapter> {
        return this.getLocalBible().pipe(
            map(bible => {
                let book = bible.antigoTestamento.find(b =>
                    b.nome.toLowerCase() === bookSlugOrName.toLowerCase() ||
                    this.normalizeSlug(b.nome) === bookSlugOrName
                );

                if (!book) {
                    book = bible.novoTestamento.find(b =>
                        b.nome.toLowerCase() === bookSlugOrName.toLowerCase() ||
                        this.normalizeSlug(b.nome) === bookSlugOrName
                    );
                }

                if (!book) throw new Error(`Livro "${bookSlugOrName}" não encontrado (AM).`);

                const chapter = book.capitulos.find(c => c.capitulo === chapterNum);
                if (!chapter) throw new Error(`Capítulo ${chapterNum} não encontrado.`);

                return {
                    book: {
                        name: book.nome,
                        author: 'Vários',
                        group: 'Ave Maria',
                        version: 'am',
                        abbrev: { pt: bookSlugOrName, en: bookSlugOrName }
                    },
                    chapter: {
                        number: chapter.capitulo,
                        verses: chapter.versiculos.length
                    },
                    verses: chapter.versiculos.map(v => ({
                        number: v.versiculo,
                        text: v.texto
                    }))
                } as unknown as Chapter;
            })
        );
    }

    searchVerses(query: string, version: string = 'nvi'): Observable<SearchResult> {
        if (version === 'am') {
            return throwError(() => new Error('Busca local na Ave Maria ainda não disponível. Use NVI para buscas.'));
        }
        const params = new HttpParams().set('version', version).set('search', query);
        return this.http.post<SearchResult>(`${this.base}/verses/search`, { version, search: query }).pipe(
            timeout(15000),
            catchError(this.handleError('searchVerses'))
        );
    }

    getRandomVerse(version: string = 'nvi'): Observable<Verse> {
        return this.http.get<Verse>(`${this.base}/verses/${version}/random`).pipe(
            timeout(10000),
            catchError(this.handleError('getRandomVerse'))
        );
    }

    private normalizeSlug(text: string): string {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');
    }
}
