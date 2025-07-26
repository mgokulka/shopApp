import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimengComponentsModule } from '../../shared/primeng-components-module';
import { MenuItem } from 'primeng/api';
import { CONST_ROUTES } from '../login/constant';
@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, PrimengComponentsModule],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  items: MenuItem[] | undefined;
  value: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Item Management',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'New Item',
            routerLink: '/' + CONST_ROUTES.createItem,
          },
          {
            label: 'View Items',
            routerLink: '/'+CONST_ROUTES.allItems,
          },
        ],
      },
      {
        label: 'Programmatic',
        icon: 'pi pi-link',
        command: () => {
          this.router.navigate(['/installation']);
        },
      },
      {
        label: 'External',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Angular',
            url: 'https://angular.io/',
          },
          {
            label: 'Vite.js',
            url: 'https://vitejs.dev/',
          },
        ],
      },
    ];
  }
}
