import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../../shared/product';
import { IProduct } from '../../../model/item';
import { CommonModule1 } from '../../../shared/common-module';
import { Router } from '@angular/router';
import { CONST_ROUTES } from '../../login/constant';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { Table } from 'primeng/table';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'all-item',
  templateUrl: './all-items.html',
  standalone: true,
  imports: [PrimengComponentsModule],
  providers: [MessageService, ConfirmationService, CommonModule1],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class allItems implements OnInit {
  productDialog: boolean = false;

  products!: IProduct[];

  product!: IProduct;

  selectedProducts!: IProduct[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly productService: ProductService,
    private readonly cd: ChangeDetectorRef,
    private route: Router
  ) {}

  exportCSV() {
    this.dt.exportCSV();
  }

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.productService.getProducts().subscribe((ele: any) => {
      this.products = ele;
      console.log('Product List>>>>', this.products);
      this.cd.markForCheck();
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'IProduct Code' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew() {
    // this.product = {};
    // this.submitted = false;
    this.route.navigate([CONST_ROUTES.createItem]);
    // this.productDialog = true;
  }

  editProduct(product: IProduct) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        variant: 'text',
      },
      acceptButtonProps: {
        severity: 'danger',
        label: 'Yes',
      },
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  deleteProduct(product: IProduct) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        variant: 'text',
      },
      acceptButtonProps: {
        severity: 'danger',
        label: 'Yes',
      },
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        // this.product = {};
        this.productService
          .deleteProduct(product.id)
          .then((res) =>
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Deleted',
              life: 3000,
            })
          )
          .catch((err) =>
            this.messageService.add({
              severity: 'danger',
              summary: 'Deletion failed',
              detail: err,
              life: 3000,
            })
          );
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity({ stock, lowStockAlert = 1 }: IProduct) {
    const status = stock % lowStockAlert === 0 ? 'LOWSTOCK' : 'INSTOCK';
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      // case 'OUTOFSTOCK':
      //   return 'danger';
    }
    return '';
  }

  // saveProduct() {
  //   this.submitted = true;

  //   if (this.product.name?.trim()) {
  //     if (this.product.id) {
  //       this.products[this.findIndexById(this.product.id)] = this.product;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Updated',
  //         life: 3000,
  //       });
  //     } else {
  //       this.product.id = this.createId();
  //       this.product.image = 'product-placeholder.svg';
  //       this.products.push(this.product);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Created',
  //         life: 3000,
  //       });
  //     }

  //     this.products = [...this.products];
  //     this.productDialog = false;
  //     this.product = {};
  //   }
  // }
}
