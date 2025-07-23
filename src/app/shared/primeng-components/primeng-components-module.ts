import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  imports: [AutoComplete, InputTextModule],
  exports: [
    CommonModule,
    AutoComplete,
    InputTextModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
  ],
})
export class PrimengComponentsModule {}
