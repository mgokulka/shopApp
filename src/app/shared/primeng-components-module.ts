import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AutoComplete } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  imports: [AutoComplete, InputTextModule],
  exports: [
    CommonModule,
    AutoComplete,
    InputTextModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule,
    RadioButtonModule,
  ],
})
export class PrimengComponentsModule {}
