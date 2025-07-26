import { Component, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateItemService, Item } from '../../../shared/create-item';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

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
  itemList: Item[] = [];
  constructor(
    private fb: FormBuilder,
    private itemService: CreateItemService,
    //add product
  ) {}
  itemMasterData: any;
  ngOnChanges() {
    if (this.barcodeValue) {
      this.searchBarcode = this.barcodeValue;
      this.fetchItem();
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

    this.itemService.items$.subscribe((data) => (this.itemMasterData = data));
    if (this.barcodeValue === '') {
      return;
    }
    this.fetchItem();
  }

  fetchItem() {
    const item = this.itemMasterData.find(
      (i: { barcode: string }) => i.barcode === this.searchBarcode.trim()
    );

    if (!item) {
      alert('Item not found.');
      this.itemForm.reset();
      return;
    }

    this.itemForm.patchValue(item);
  }

  updateItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const updatedItem: Item = {
      ...this.itemForm.getRawValue(), // includes disabled fields
    };

    const index = this.itemMasterData.findIndex(
      (i: { barcode: string }) => i.barcode === updatedItem.barcode
    );

    if (index !== -1) {
      this.itemService.updateItem(updatedItem);
      alert('Item updated successfully!');
    }
  }
}
