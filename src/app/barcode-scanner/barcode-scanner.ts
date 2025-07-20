import { Component, HostListener, inject } from '@angular/core';
import { CreateIte } from '../Item/create-item/create-item';
import { CreateItemService } from '../Item/create-item';
import { ViewItem } from '../Item/view-item/view-item';

@Component({
  selector: 'app-barcode-scanner',
  imports: [CreateIte,ViewItem],
  templateUrl: './barcode-scanner.html',
  styleUrl: './barcode-scanner.scss',
  standalone: true,
})
export class BarcodeScanner {
  scannedCode: string = '';

  private buffer: string = '';
  private lastScanTime: number = 0;
  private _ItemsService = inject(CreateItemService);
  showCreateItemComponent: boolean = false;
  @HostListener('document:keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const now = Date.now();
    if (now - this.lastScanTime > 500) {
      this.buffer = '';
    }
    this.lastScanTime = now;
    if (event.key === 'Enter') {
      this.scannedCode = this.buffer;
      this.buffer = '';
      const check = this._ItemsService.checkBarcodeExists(this.scannedCode);
      if (!check) {
        this.showCreateItemComponent = true;
      }
      else {
        this.showCreateItemComponent = false;    
      }
    } else {
      this.buffer += event.key;
    }
  }
}
