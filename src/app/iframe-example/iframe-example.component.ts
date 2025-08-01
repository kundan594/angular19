import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-iframe-example',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './iframe-example.component.html',
  styleUrls: ['./iframe-example.component.css']
})
export class IframeExampleComponent implements OnDestroy {
  url: string = 'https://www.example.com';
  safeUrl: SafeResourceUrl;
  messageFromIframe: string = '';
  messageToIframe: string = 'Hello from Angular!';
  iframeRef?: HTMLIFrameElement;

  constructor(private sanitizer: DomSanitizer) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    window.addEventListener('message', this.receiveMessage.bind(this));
  }

  updateUrl(newUrl: string) {
    this.url = newUrl;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  onIframeLoad(iframe: HTMLIFrameElement) {
    this.iframeRef = iframe;
  }

  sendMessageToIframe() {
    if (this.iframeRef && this.iframeRef.contentWindow) {
      this.iframeRef.contentWindow.postMessage(this.messageToIframe, '*');
    }
  }

  receiveMessage(event: MessageEvent) {
    // For demo, accept all origins. In production, check event.origin!
    this.messageFromIframe = event.data;
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.receiveMessage.bind(this));
  }
}
