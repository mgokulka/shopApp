import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CreateItemService, Item } from '../create-item';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-item',
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule],
  standalone: true,
  templateUrl: './create-item.html',
  styleUrl: './create-item.scss',
})
export class CreateIte implements OnChanges {
  itemForm!: FormGroup;
  visible = false;
  private barcodeSub!: Subscription;
  @Input() barcodeValue: any = '';
  constructor(
    private fb: FormBuilder,
    private itemService: CreateItemService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.barcodeValue = changes['barcodeValue']?.currentValue || '';
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      barcode: [this.barcodeValue, Validators.required],
      name: ['', Validators.required],
      dateOfPurchase: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
      quantity: [1, [Validators.required, Validators.min(1)]],
      buyPrice: [0, [Validators.required, Validators.min(0)]],
      sellPrice: [0, [Validators.required, Validators.min(0)]],
      color: [''],
    });

    this.barcodeSub = this.itemService.selectedBarcode$.subscribe((barcode) => {
      if (barcode) {
        this.itemForm.patchValue({ barcode });
        this.visible = true;
      }
    });
  }

  createItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const item: Item = this.itemForm.value;
    this.itemService.addItem(item);
    alert('Item created successfully!');

    this.resetForm();
  }

  resetForm() {
    this.itemForm.reset({
      dateOfPurchase: new Date().toISOString().substring(0, 10),
      quantity: 1,
      buyPrice: 0,
      sellPrice: 0,
    });
    this.visible = false;
    this.itemService.clearSelectedBarcode();
  }

  ngOnDestroy() {
    this.barcodeSub.unsubscribe();
  }
}
