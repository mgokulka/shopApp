import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimengComponentsModule } from '../../shared/primeng-components/primeng-components-module';
import { MenuItem } from 'primeng/api';
import { FilterService, SelectItemGroup } from 'primeng/api';

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
            routerLink: '/create-item',
          },
          {
            label: 'View Items',
            routerLink: '/view-items',
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
