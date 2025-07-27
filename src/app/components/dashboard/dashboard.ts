import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimengComponentsModule } from '../../shared/primeng-components-module';
import { MenuItem } from 'primeng/api';
import { CONST_ROUTES } from '../login/constant';
import { CommonModule1 } from '../../shared/common-module';
import { AutoCompleteCompleteEvent } from '../../model/primengModels';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  imports: [PrimengComponentsModule, CommonModule1],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  showSidebar: boolean = false;
  items: any[] = [];
  value: any;

  search(event: AutoCompleteCompleteEvent) {
    let _items = [...Array(10).keys()];

    this.items = event.query
      ? [...Array(10).keys()].map((item) => event.query + '-' + item)
      : _items;
  }
  ngOnInit() {}
  navItems: TreeNode[] = [
    {
      label: 'Product',
      children: [
        { label: 'Create', data: CONST_ROUTES.createItem },
        { label: 'List', data: CONST_ROUTES.allItems },
        { label: 'Read', data: CONST_ROUTES.viewItems },
        { label: 'Update', data: '/product/update' },
        { label: 'Delete', data: '/product/delete' },
      ],
    },
    {
      label: 'Accounts',
      children: [
        { label: 'Create', data: '/accounts/create' },
        { label: 'Read', data: '/accounts/read' },
        { label: 'Update', data: '/accounts/update' },
        { label: 'Delete', data: '/accounts/delete' },
      ],
    },
    {
      label: 'Billing',
      children: [
        { label: 'Create New', data: '/billing/new' },
        { label: 'Search', data: '/billing/search' },
        { label: 'Modify', data: '/billing/modify' },
      ],
    },
  ];

  constructor(private router: Router) {}

  navigate(node: TreeNode) {
    if (node.data) {
      this.router.navigate([node.data]);
      this.showSidebar = false;
    }
  }
}
