import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonBadge,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
    IonSpinner,
    IonNote,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    bookOutline,
    bookSharp,
    searchOutline,
    shuffleOutline,
    chevronForwardOutline,
    starOutline,
    refreshOutline,
    informationCircleOutline,
    statsChartOutline,
    mailOutline,
    locateOutline,
    medicalOutline,
    gitBranchOutline,
    sparklesOutline
} from 'ionicons/icons';

import { BibleService } from '../../services/bible.service';
import { BibleInsightService, BibleFact } from '../../services/insight.service';
import { Book, BibleVersionSlug, BIBLE_VERSIONS } from '../../models/bible.models';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonList,
        IonItem,
        IonBadge,
        IonIcon,
        IonSelect,
        IonSelectOption,
        IonSearchbar,
        IonSpinner,
        IonNote,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonChip,
    ],
})
export class HomePage implements OnInit, OnDestroy {
    books: Book[] = [];
    filteredBooks: Book[] = [];
    loading = true;
    error: string | null = null;
    insight: BibleFact | null = null;

    selectedVersion: BibleVersionSlug = 'nvi';
    selectedTestament: 'VT' | 'NT' | 'ALL' = 'ALL';
    searchTerm = '';

    versions = BIBLE_VERSIONS;

    private destroy$ = new Subject<void>();

    constructor(
        private bibleService: BibleService,
        private insightService: BibleInsightService,
        private router: Router,
        private toastCtrl: ToastController,
    ) {
        addIcons({
            bookOutline,
            bookSharp,
            searchOutline,
            shuffleOutline,
            chevronForwardOutline,
            starOutline,
            refreshOutline,
            informationCircleOutline,
            statsChartOutline,
            mailOutline,
            locateOutline,
            medicalOutline,
            gitBranchOutline,
            sparklesOutline,
        });
    }

    ngOnInit() {
        this.loadBooks();
        this.loadInsight();
    }

    loadInsight() {
        this.insight = this.insightService.getRandomFact();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadBooks() {
        this.loading = true;
        this.error = null;

        this.bibleService
            .getBooks()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (books) => {
                    this.books = books;
                    this.applyFilters();
                    this.loading = false;
                },
                error: (err) => {
                    this.error = err.message;
                    this.loading = false;
                    this.showToast(err.message, 'danger');
                },
            });
    }

    applyFilters() {
        let result = [...this.books];

        if (this.selectedTestament !== 'ALL') {
            result = result.filter((b) => b.testament === this.selectedTestament);
        }

        if (this.searchTerm.trim()) {
            const term = this.searchTerm.toLowerCase();
            result = result.filter(
                (b) =>
                    b.name.toLowerCase().includes(term) ||
                    b.author.toLowerCase().includes(term) ||
                    b.abbrev.pt.toLowerCase().includes(term)
            );
        }

        this.filteredBooks = result;
    }

    onSearchChange(event: CustomEvent) {
        this.searchTerm = event.detail.value ?? '';
        this.applyFilters();
    }

    onTestamentChange(event: CustomEvent) {
        this.selectedTestament = event.detail.value;
        this.applyFilters();
    }

    openBook(book: Book) {
        this.router.navigate(['/reader'], {
            queryParams: {
                book: book.abbrev.pt,
                bookName: book.name,
                chapter: 1,
                version: this.selectedVersion,
            },
        });
    }

    openRandomVerse() {
        this.router.navigate(['/reader'], {
            queryParams: { random: true, version: this.selectedVersion },
        });
    }

    private async showToast(message: string, color: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 4000,
            color,
            position: 'bottom',
        });
        await toast.present();
    }

    get vtCount() {
        return this.books.filter((b) => b.testament === 'VT').length;
    }
    get ntCount() {
        return this.books.filter((b) => b.testament === 'NT').length;
    }

    trackByBook(_index: number, book: Book) {
        return book.abbrev.pt;
    }
}
