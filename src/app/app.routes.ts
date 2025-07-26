import { Routes } from '@angular/router';
import { CONST_ROUTES } from './components/login/constant';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    // path: CONST_ROUTES.barcode_scanner,
    path: 'barcode-scanner',
    loadComponent: () =>
      import('./components/barcode-scanner/barcode-scanner').then(
        (m) => m.BarcodeScanner
      ),
  },
  {
    // path: CONST_ROUTES.createItem,
    path: 'create-item',
    loadComponent: () =>
      import('./components/Item/create-item/create-item').then(
        (m) => m.CreateIte
      ),
  },
  {
    // path: CONST_ROUTES.viewItems,
    path:'view-items',
    loadComponent: () =>
      import('./components/Item/view-item/view-item').then((m) => m.ViewItem),
  },
  {
    // path: CONST_ROUTES.login,
    path:'login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.LoginComponent),
  },
  {
    // path: CONST_ROUTES.allItems,
    path:'all-items',
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
];
