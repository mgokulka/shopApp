import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
  @Output() fileBase64Image: EventEmitter<string> = new EventEmitter();
  base64Image: string | null = null;
  previewUrl: string | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.previewUrl = this.base64Image;
        this.fileBase64Image.emit(this.base64Image);
      };
      reader.readAsDataURL(file);
    }
  }
}
