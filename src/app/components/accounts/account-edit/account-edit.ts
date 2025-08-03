import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { COLLECTION_CONSTANT, ProductService } from '../../../shared/product';
@Component({
  selector: 'app-account-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './account-edit.html',
  styleUrls: ['./account-edit.scss'],
})
export class AccountEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private productService = inject(ProductService);

  form!: FormGroup;
  accountId!: string;

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id') || '';
    this.buildForm();
    this.loadAccountData();
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      gstNumber: [''],
    });
  }

  async loadAccountData() {
    if (!this.accountId) return;
    const data = this.productService.getByID(this.accountId);
    console.log(data);
  }

  async onSubmit() {
    if (this.form.invalid) return;
    await this.productService.updateProduct(
      this.accountId,
      this.form.value,
      COLLECTION_CONSTANT.Account
    );
    this.router.navigate(['/accounts/list']);
  }
}
