import { Routes } from '@angular/router';
import { CONST_ROUTES } from './components/login/constant';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: CONST_ROUTES.barcode_scanner,
    loadComponent: () =>
      import('./components/barcode-scanner/barcode-scanner').then(
        (m) => m.BarcodeScanner
      ),
  },
  {
    path: CONST_ROUTES.createItem,
    loadComponent: () =>
      import('./components/Item/create-item/create-item').then(
        (m) => m.CreateIte
      ),
  },
  {
    path: CONST_ROUTES.viewItems,
    loadComponent: () =>
      import('./components/Item/view-item/view-item').then((m) => m.ViewItem),
  },
  {
    path: CONST_ROUTES.login,
    loadComponent: () =>
      import('./components/login/login').then((m) => m.LoginComponent),
  },
  {
    path: CONST_ROUTES.allItems,
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
];
