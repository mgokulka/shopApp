import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AccountService } from '../../../shared/account-service';
import { COLLECTION_CONSTANT, ProductService } from '../../../shared/product';
import { IAccounts } from '../../../model/accounts';

@Component({
  selector: 'app-account-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './account-create.html',
  styleUrls: ['./account-create.scss'],
})
export class AccountCreateComponent {
  private fb = inject(FormBuilder);
  constructor(
    private accountService: AccountService,
    private productService: ProductService
  ) {}

  private router = inject(Router);

  accountForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address: [''],
    gstNumber: [''],
  });

  onSubmit(): void {
    if (this.accountForm.invalid) return;

    this.productService
      .addProduct(this.accountForm.value, COLLECTION_CONSTANT.Account)
      .then(() => {
        alert('Account created successfully');
        this.router.navigate(['/accounts/list']);
      })
      .catch((err) => {
        console.error('Error creating account', err);
        alert('Something went wrong.');
      });
  }
}
