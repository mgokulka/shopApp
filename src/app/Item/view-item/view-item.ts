import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateItemService, Item } from '../create-item';
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
export class ViewItem {
  searchBarcode: string = '';
  itemForm!: FormGroup;
  @Input() barcodeValue: string = '';

  constructor(
    private fb: FormBuilder,
    private itemService: CreateItemService
  ) {}
  itemMasterData: any;
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
