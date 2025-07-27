import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../model/item';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { ProductService } from '../../../shared/product';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-item',
  imports: [ReactiveFormsModule, CommonModule, PrimengComponentsModule],
  providers:[MessageService],
  standalone: true,
  templateUrl: './create-item.html',
  styleUrl: './create-item.scss',
})
export class CreateIte implements OnChanges {
  productForm!: FormGroup;
  visible = false;
  private barcodeSub!: Subscription;
  @Input() barcodeValue: any = '';
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,

  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.barcodeValue = changes['barcodeValue']?.currentValue || '';
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      sizes: this.fb.array([
        this.createSizeGroup(), // default one
      ]),
      color: ['#6466f1'], // default color
      costPrice: [0, [Validators.required, Validators.min(0)]],
      sellingPrice: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      lowStockAlert: [0],
      category: [''],
      brand: [''],
      tax: [0],
      imageUrl: [''],
    });

    this.barcodeSub = this.productService.selectedBarcode$.subscribe((barcode) => {
      if (barcode) {
        this.productForm.patchValue({ barcode });
        this.visible = true;
      }
    });
  }
  createSizeGroup(): FormGroup {
    return this.fb.group({
      size: [''],
      quantity: [0],
    });
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  addSize() {
    if (this.productForm.get('stock')?.value === 0) {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Products Deleted',
        life: 3000,
      });
    }
    this.sizes.push(this.createSizeGroup());
  }

  removeSize(index: number) {
    if (this.sizes.length > 0) this.sizes.removeAt(index);
  }
  generateBarcode() {
    const code = Math.floor(10000000 + Math.random() * 90000000).toString();
    this.productForm.patchValue({ barcode: code });
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return (control && control.invalid && control.touched) ?? false;
  }

  onImageSelect(event: any) {
    const file = event.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  createItem() {
    if (this.productForm.valid) {
      const product: IProduct = this.productForm.value;
      console.log('Submitting Product:', product);
      this.productService
        .addProduct(product)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // Firebase or API call
    }
  }

  resetForm() {
    this.productForm.reset({
      color: '#ffffff',
      costPrice: 0,
      sellingPrice: 0,
      stock: 0,
      lowStockAlert: 0,
      tax: 0,
    });
  }

  ngOnDestroy() {
    this.barcodeSub.unsubscribe();
  }
}
