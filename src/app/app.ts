import { Component, signal } from '@angular/core';
import { BarcodeScanner } from './barcode-scanner/barcode-scanner';

@Component({
  selector: 'app-root',
  imports: [ BarcodeScanner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demoAPp');
}
