import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimengComponentsModule } from '../../shared/primeng-components-module';
import { MenuItem } from 'primeng/api';
import { CONST_ROUTES } from '../login/constant';
import { CommonModule1 } from '../../shared/common-module';
import { AutoCompleteCompleteEvent } from '../../model/primengModels';
import { TreeNode } from 'primeng/api';
import { LoginComponent } from '../login/login';
import { SelectChangeEvent } from 'primeng/select';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [PrimengComponentsModule, CommonModule1, LoginComponent],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  showSidebar: boolean = false;
  items: any[] = [];
  value: any;
  loginStatus(event: boolean) {
    this.isLoggedIn = event;
    ``;
  }
  isLoggedIn: boolean = true;
  search(event: AutoCompleteCompleteEvent) {
    let _items = [...Array(10).keys()];

    this.items = event.query
      ? [...Array(10).keys()].map((item) => event.query + '-' + item)
      : _items;
  }
  cities: City[] = [];

  selectedCity!: City;
  ngOnInit() {
    this.cities = [
      { name: 'Product', code: CONST_ROUTES.allItems },
      { name: 'Accounts', code: CONST_ROUTES.accountList },
      { name: 'Read', code: CONST_ROUTES.viewItems },
    ];
    // this.selectedCity = this.cities[0];
  }
  navItems: TreeNode[] = [
    {
      label: 'Product',
      children: [
        { label: 'Create', data: CONST_ROUTES.createItem },
        { label: 'List', data: CONST_ROUTES.allItems },
        { label: 'Read', data: CONST_ROUTES.viewItems },
      ],
    },
    {
      label: 'Accounts',
      children: [
        { label: 'Create', data: CONST_ROUTES.accountCreate },
        { label: 'Edit', data: CONST_ROUTES.accountEdit },
        { label: 'List', data: CONST_ROUTES.accountList },
      ],
    },
    // {
    //   label: 'Billing',
    //   children: [
    //     { label: 'Create New', data: '/billing/new' },
    //     { label: 'Search', data: '/billing/search' },
    //     { label: 'Modify', data: '/billing/modify' },
    //   ],
    // },
  ];

  constructor(private router: Router) {}

  navigate(node: TreeNode) {
    if (node.data) {
      this.router.navigate([node.data]);
      this.showSidebar = false;
    }
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  onChange(event: SelectChangeEvent) {
    debugger;
    this.router.navigate([event.value.code]);
  }
}
