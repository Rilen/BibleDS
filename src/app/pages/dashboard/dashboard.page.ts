import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonIcon,
    IonChip,
} from '@ionic/angular/standalone';
import { BibleAnalyticsService, BibleAnalytics } from '../../services/analytics.service';
import { addIcons } from 'ionicons';
import {
    statsChartOutline,
    layersOutline,
    analyticsOutline,
    bookmarksOutline,
    textOutline,
    documentTextOutline,
    briefcaseOutline,
    infiniteOutline,
    peopleOutline,
    locationOutline,
    cubeOutline,
    cloudOutline,
    flaskOutline,
    hourglassOutline,
    gitMergeOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonBackButton,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonSpinner,
        IonGrid,
        IonRow,
        IonCol,
        IonBadge,
        IonIcon,
        IonChip,
    ],
})
export class DashboardPage implements OnInit {
    stats: BibleAnalytics | null = null;
    loading = true;

    constructor(private analyticsService: BibleAnalyticsService) {
        addIcons({
            statsChartOutline,
            layersOutline,
            analyticsOutline,
            bookmarksOutline,
            textOutline,
            documentTextOutline,
            briefcaseOutline,
            infiniteOutline,
            peopleOutline,
            locationOutline,
            cubeOutline,
            cloudOutline,
            flaskOutline,
            hourglassOutline,
            gitMergeOutline
        });
    }

    ngOnInit() {
        this.analyticsService.getGlobalStats().subscribe((data) => {
            this.stats = data;
            this.loading = false;
        });
    }

    getPercentage(part: number, total: number): number {
        return (part / total) * 100;
    }
}
