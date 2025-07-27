import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AutoComplete } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { AutoFocusModule } from 'primeng/autofocus';
import { FileUploadModule } from 'primeng/fileupload';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ChipModule } from 'primeng/chip';
import { ScrollPanelModule } from 'primeng/scrollpanel';
@NgModule({
  imports: [
    AutoComplete,
    InputTextModule,
    RadioButton,
    Dialog,
    Ripple,
    ConfirmDialog,
    FileUpload,
    Tag,
    Rating,
    InputNumber,
  ],
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
    TableModule,
    IconFieldModule,
    InputIconModule,
    ToolbarModule,
    ToastModule,
    SelectModule,
    RadioButton,
    Dialog,
    Ripple,
    ConfirmDialog,
    FileUpload,
    Tag,
    Rating,
    InputNumber,
    DrawerModule,
    AvatarModule,
    TreeSelectModule,
    TreeModule,
    FileUploadModule,
    AutoFocusModule,
    ColorPickerModule,
    ChipModule,
    ScrollPanelModule,
  ],
})
export class PrimengComponentsModule {}
