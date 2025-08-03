import { Component, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IProduct } from '../../../model/item';
import { COLLECTION_CONSTANT, ProductService } from '../../../shared/product';

@Component({
  selector: 'app-view-item',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
  ],
  standalone: true,
  templateUrl: './view-item.html',
  styleUrl: './view-item.scss',
})
export class ViewItem implements OnChanges {
  searchBarcode: string = '';
  itemForm!: FormGroup;
  @Input() barcodeValue: string = '';
  itemList: IProduct[] = [];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}
  itemMasterData: any;
  ngOnChanges() {
    if (this.barcodeValue) {
      this.searchBarcode = this.barcodeValue;
    }
    // this.dataService.addItem({ name: 'Shirt', price: 200, stock: 10 } as Item);
    // this.dataService.deleteItem('abc123');
    // this.dataService.updateItem('abc123', { price: 250 });
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      barcode: [{ value: '', disabled: true }], // barcode is read-only
      name: ['', Validators.required],
      dateOfPurchase: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      buyPrice: [0, [Validators.required, Validators.min(0)]],
      sellPrice: [0, [Validators.required, Validators.min(0)]],
      color: [''],
    });

    this.productService
      .getProducts(COLLECTION_CONSTANT.Product)
      .subscribe((data) => (this.itemMasterData = data));
    if (this.barcodeValue === '') {
      return;
    }
    this.itemForm.patchValue({});
  }
  updateItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const updatedItem: IProduct = {
      ...this.itemForm.getRawValue(), // includes disabled fields
    };

    const index = this.itemMasterData.findIndex(
      (i: { barcode: string }) => i.barcode === updatedItem.barcode
    );

    if (index !== -1) {
      this.productService.updateProduct(10, { name: 'string' },COLLECTION_CONSTANT.Product);
      alert('Item updated successfully!');
    }
  }
}
