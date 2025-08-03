import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AccountService } from '../../../shared/account-service';
import { COLLECTION_CONSTANT, ProductService } from '../../../shared/product';
@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './account-list.html',
  styleUrls: ['./account-list.scss'],
})
export class AccountListComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private productService = inject(ProductService);

  accounts: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.productService.getProducts(COLLECTION_CONSTANT.Account).subscribe({
      next: (data) => {
        this.accounts = data;
        console.log(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load accounts', err);
        this.loading = false;
      },
    });
  }

  editAccount(accountId: string) {
    this.router.navigate(['/accounts/edit', accountId]);
  }

  deleteAccount(accountId: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(accountId);
    }
  }
}
