import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { COLLECTION_CONSTANT, ProductService } from '../../../shared/product';
import { MessageService } from 'primeng/api';
import { FileUpload } from '../../common-component/file-upload/file-upload';

@Component({
  selector: 'app-create-item',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PrimengComponentsModule,
    FileUpload,
  ],
  providers: [MessageService],
  standalone: true,
  templateUrl: './create-item.html',
  styleUrl: './create-item.scss',
})
export class CreateItem implements OnChanges {
  productForm!: FormGroup;
  @Input() currentProduct!: IProduct;
  private barcodeSub!: Subscription;
  @Input() barcodeValue: any = '';
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.barcodeValue = changes['barcodeValue']?.currentValue || '';
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [''],
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
    const sizeCount = this.currentProduct.sizes.length;
    for (let i = 1; i < sizeCount; i++) {
      this.sizes.push(this.createSizeGroup());
    }
    this.productForm.patchValue(this.currentProduct);

    this.barcodeSub = this.productService.selectedBarcode$.subscribe(
      (barcode) => {
        if (barcode) {
          this.productForm.patchValue({ barcode });
        }
      }
    );
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
  createItem() {
    if (this.productForm.valid) {
      const product: IProduct = this.productForm.value;
      if (product.id !== '') {
        this.productService
          .updateProduct(product.id, product, COLLECTION_CONSTANT.Product)
          .then((res) => {
            console.log(res);
            this.closePopup.emit(true);
          })
          .catch((err) => console.log(err));
      } else {
        this.productService
          .addProduct(product, COLLECTION_CONSTANT.Product)
          .then((res) => {
            console.log(res);
            this.closePopup.emit(true);
          })
          .catch((err) => console.log(err));
      }
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
