import { Routes } from '@angular/router';
import { CONST_ROUTES } from './components/login/constant';

export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
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
        (m) => m.CreateItem
      ),
  },
  {
    path: CONST_ROUTES.viewItems,
    loadComponent: () =>
      import('./components/Item/view-item/view-item').then((m) => m.ViewItem),
  },
  {
    path: CONST_ROUTES.allItems,
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
  {
    path: CONST_ROUTES.accountList,
    loadComponent: () =>
      import('./components/accounts/account-list/account-list').then(
        (m) => m.AccountListComponent
      ),
  },
  {
    path: CONST_ROUTES.accountCreate,
    loadComponent: () =>
      import('./components/accounts/account-create/account-create').then(
        (m) => m.AccountCreateComponent
      ),
  },
  {
    path: CONST_ROUTES.accountEdit,
    loadComponent: () =>
      import('./components/accounts/account-edit/account-edit').then(
        (m) => m.AccountEditComponent
      ),
  },
  {
    path: CONST_ROUTES.allItems,
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
  {
    path: CONST_ROUTES.allItems,
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
  {
    path: CONST_ROUTES.allItems,
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
  {
    path: CONST_ROUTES.allItems,
    loadComponent: () =>
      import('./components/Item/all-items/all-items').then((m) => m.allItems),
  },
];
