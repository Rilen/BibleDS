import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonItem,
    IonBadge,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
    IonSpinner,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonChip,
    IonFooter,
    ToastController,
    AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    arrowBackOutline,
    arrowForwardOutline,
    searchOutline,
    copyOutline,
    shareOutline,
    bookmarkOutline,
    textOutline,
    closeOutline,
    informationCircleOutline,
    refreshOutline,
} from 'ionicons/icons';

import { BibleService } from '../../services/bible.service';
import { Verse, Chapter, BibleVersionSlug, BIBLE_VERSIONS, SearchResult } from '../../models/bible.models';

type ViewMode = 'chapter' | 'search' | 'analysis';

interface SearchStats {
    bookDistribution: { name: string; count: number }[];
    totalVerses: number;
}

interface ChapterAnalysis {
    wordCount: number;
    uniqueWords: number;
    topWords: { word: string; count: number }[];
}

@Component({
    selector: 'app-reader',
    templateUrl: './reader.page.html',
    styleUrls: ['./reader.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonItem,
        IonBadge,
        IonIcon,
        IonSelect,
        IonSelectOption,
        IonSearchbar,
        IonSpinner,
        IonButton,
        IonButtons,
        IonCard,
        IonCardContent,
        IonChip,
        IonFooter,
        IonLabel,
    ],
})
export class ReaderPage implements OnInit, OnDestroy {
    // ─── Estado ────────────────────────────────────────────────
    viewMode: ViewMode = 'chapter';

    selectedVersion: BibleVersionSlug = 'nvi';
    compareMode = false;
    secondaryVersion: BibleVersionSlug = 'ra';

    currentBook = '';
    currentBookName = '';
    currentChapter = 1;
    totalChapters = 0;

    verses: Verse[] = [];
    secondaryVerses: Verse[] = [];
    searchResults: SearchResult | null = null;
    searchStats: SearchStats | null = null;
    searchTerm = '';
    highlightedVerses = new Set<number>();

    loading = false;
    searchLoading = false;
    error: string | null = null;

    analysis: ChapterAnalysis | null = null;

    fontSize = 16; // px
    versions = BIBLE_VERSIONS;

    private destroy$ = new Subject<void>();
    private searchSubject = new Subject<string>();

    constructor(
        private bibleService: BibleService,
        private route: ActivatedRoute,
        private router: Router,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
    ) {
        addIcons({
            arrowBackOutline,
            arrowForwardOutline,
            searchOutline,
            copyOutline,
            shareOutline,
            bookmarkOutline,
            textOutline,
            closeOutline,
            informationCircleOutline,
            refreshOutline,
            analyticsOutline: 'analytics-outline',
            layersOutline: 'layers-outline'
        });
    }

    ngOnInit() {
        // Configura busca reativa com debounce
        this.searchSubject
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((query) => {
                if (query.trim().length > 2) {
                    this.doSearch(query);
                } else {
                    this.searchResults = null;
                }
            });

        // Lê query params
        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                if (params['random']) {
                    this.loadRandomVerse();
                    return;
                }
                if (params['book']) {
                    this.currentBook = params['book'];
                    this.currentBookName = params['bookName'] ?? params['book'];
                    this.currentChapter = Number(params['chapter'] ?? 1);
                    this.selectedVersion = (params['version'] as BibleVersionSlug) ?? 'nvi';
                    this.loadChapter();
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // ─── Carregamento de Capítulo ──────────────────────────────

    loadChapter() {
        this.loading = true;
        this.error = null;
        this.verses = [];

        this.bibleService
            .getChapter(this.selectedVersion, this.currentBook, this.currentChapter)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (chapter: Chapter) => {
                    this.verses = chapter.verses;
                    this.totalChapters = chapter.book
                        ? (chapter.chapter?.verses ?? chapter.verses.length)
                        : 0;
                    this.performAnalysis();
                    this.loading = false;
                },
                error: (err) => {
                    this.error = err.message;
                    this.loading = false;
                    this.showToast(err.message, 'danger');
                },
            });

        // Se o modo comparação estiver ativo, carregar a segunda versão
        if (this.compareMode) {
            this.bibleService
                .getChapter(this.secondaryVersion, this.currentBook, this.currentChapter)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (chapter: Chapter) => {
                        this.secondaryVerses = chapter.verses;
                    },
                    error: (err) => {
                        console.warn('Falha ao carregar versão secundária', err);
                    }
                });
        }
    }

    toggleComparison() {
        this.compareMode = !this.compareMode;
        if (this.compareMode) {
            this.loadChapter();
        } else {
            this.secondaryVerses = [];
        }
    }

    onSecondaryVersionChange(event: CustomEvent) {
        this.secondaryVersion = event.detail.value;
        if (this.compareMode) {
            this.loadChapter();
        }
    }

    loadRandomVerse() {
        this.loading = true;
        this.bibleService
            .getRandomVerse(this.selectedVersion)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (verse: Verse) => {
                    this.currentBookName = verse.book.name;
                    this.currentBook = verse.book.abbrev.pt;
                    this.currentChapter = verse.chapter;
                    this.verses = [verse];
                    this.highlightedVerses.add(verse.number);
                    this.loading = false;
                },
                error: (err) => {
                    this.error = err.message;
                    this.loading = false;
                },
            });
    }

    // ─── Navegação entre Capítulos ─────────────────────────────

    previousChapter() {
        if (this.currentChapter > 1) {
            this.currentChapter--;
            this.loadChapter();
        }
    }

    nextChapter() {
        this.currentChapter++;
        this.loadChapter();
    }

    onVersionChange(event: CustomEvent) {
        this.selectedVersion = event.detail.value;
        if (this.viewMode === 'chapter' && this.currentBook) {
            this.loadChapter();
        } else if (this.viewMode === 'search' && this.searchTerm.trim().length > 2) {
            this.doSearch(this.searchTerm);
        }
    }

    // ─── Busca ─────────────────────────────────────────────────

    setViewMode(mode: ViewMode) {
        this.viewMode = mode;
        if (mode === 'chapter') {
            this.searchResults = null;
        }
    }

    onSearchInput(event: CustomEvent) {
        const query = event.detail.value ?? '';
        this.searchTerm = query;
        this.searchSubject.next(query);
    }

    doSearch(query: string) {
        this.searchLoading = true;
        this.searchResults = null;

        this.bibleService
            .searchVerses(query, this.selectedVersion)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (results: SearchResult) => {
                    this.searchResults = results;
                    this.calculateSearchStats(results);
                    this.searchLoading = false;
                },
                error: (err) => {
                    this.searchLoading = false;
                    this.searchStats = null;
                    this.showToast(err.message, 'danger');
                },
            });
    }

    private calculateSearchStats(results: SearchResult) {
        if (!results.verses || results.verses.length === 0) {
            this.searchStats = null;
            return;
        }

        const distributionMap = new Map<string, number>();
        results.verses.forEach(v => {
            const bookName = v.book.name;
            distributionMap.set(bookName, (distributionMap.get(bookName) || 0) + 1);
        });

        const sortedDistribution = Array.from(distributionMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10 livros

        this.searchStats = {
            bookDistribution: sortedDistribution,
            totalVerses: results.verses.length
        };
    }

    openSearchedVerse(verse: Verse) {
        this.currentBook = verse.book.abbrev.pt;
        this.currentBookName = verse.book.name;
        this.currentChapter = verse.chapter;
        this.highlightedVerses.clear();
        this.highlightedVerses.add(verse.number);
        this.viewMode = 'chapter';
        this.loadChapter();
    }

    // ─── Análise de Dados ───────────────────────────────────────

    private performAnalysis() {
        if (!this.verses || this.verses.length === 0) {
            this.analysis = null;
            return;
        }

        const stopWords = new Set([
            'a', 'o', 'as', 'os', 'e', 'do', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas',
            'em', 'um', 'uma', 'uns', 'umas', 'com', 'por', 'para', 'se', 'que', 'muito',
            'pelo', 'pela', 'mais', 'meu', 'teu', 'seu', 'sua', 'isto', 'aquilo', 'este',
            'esta', 'eles', 'elas', 'vós', 'nós', 'lhe', 'lhes', 'dele', 'dela', 'num', 'numa',
            'através', 'então', 'entanto', 'pois', 'nem', 'também', 'porque'
        ]);

        const wordsMap = new Map<string, number>();
        let totalWords = 0;

        this.verses.forEach(v => {
            // Limpa pontuação e converte para minúsculas
            const words = v.text
                .toLowerCase()
                .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
                .split(/\s+/)
                .filter(w => w.length > 2); // Ignora palavras muito curtas

            words.forEach(w => {
                totalWords++;
                if (!stopWords.has(w)) {
                    wordsMap.set(w, (wordsMap.get(w) || 0) + 1);
                }
            });
        });

        const sortedWords = Array.from(wordsMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15) // Top 15 palavras
            .map(([word, count]) => ({ word, count }));

        this.analysis = {
            wordCount: totalWords,
            uniqueWords: wordsMap.size,
            topWords: sortedWords
        };
    }

    // ─── Utilitários ────────────────────────────────────────────

    trackByNumber(index: number, verse: Verse) {
        return verse.number;
    }

    increaseFontSize() {
        if (this.fontSize < 26) this.fontSize += 1;
    }

    decreaseFontSize() {
        if (this.fontSize > 12) this.fontSize -= 1;
    }

    async copyVerse(verse: Verse) {
        const text = `${verse.book.name} ${verse.chapter}:${verse.number} — "${verse.text}"`;
        await navigator.clipboard.writeText(text);
        this.showToast('Versículo copiado!', 'success');
    }

    get versionLabel() {
        return this.versions.find((v) => v.slug === this.selectedVersion)?.label ?? this.selectedVersion;
    }

    private async showToast(message: string, color: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 3000,
            color,
            position: 'bottom',
        });
        await toast.present();
    }
}
