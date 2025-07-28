import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'barcode-scanner',
    loadComponent: () =>
      import('./components/barcode-scanner/barcode-scanner').then(
        (m) => m.BarcodeScanner
      ),
  },
  {
    path: 'create-item',
    loadComponent: () =>
      import('./components/Item/create-item/create-item').then(
        (m) => m.CreateItem
      ),
  },
  {
    path: 'view-item',
    loadComponent: () =>
      import('./components/Item/view-item/view-item').then((m) => m.ViewItem),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'all-item',
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
];
