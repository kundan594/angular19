import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [],
  template: `
    <button (click)="loadPdf()">Load PDF</button>
    <iframe *ngIf="pdfSrc" [src]="pdfSrc" width="100%" height="600px" style="border:1px solid #ccc;"></iframe>
  `,
  styles: [`
    :host { display: block; max-width: 900px; margin: 2em auto; }
    button { margin-bottom: 1em; }
  `]
})
export class PdfViewerComponent {
  pdfSrc?: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  loadPdf() {
    this.http.get('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', { responseType: 'blob' }).subscribe(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }
}
