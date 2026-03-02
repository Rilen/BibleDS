import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'reader',
        loadComponent: () =>
            import('./pages/reader/reader.page').then((m) => m.ReaderPage),
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
