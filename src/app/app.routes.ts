import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'barcode-scanner', pathMatch: 'full' },
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
      import('./Item/create-item/create-item').then((m) => m.CreateIte),
  },
  {
    path: 'view-items',
    loadComponent: () =>
      import('./Item/view-item/view-item').then((m) => m.ViewItem),
  },
];
