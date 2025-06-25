import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()',
  },
})
export class LogDirective {
  private elementRef = inject(ElementRef);

  onLog() {
    console.log('CLICKED');
    console.log(this.elementRef.nativeElement);
    this.elementRef.nativeElement.style.color = "red";
    this.elementRef.nativeElement.style.color = "red";
  this.elementRef.nativeElement.style.border = "2px solid blue";
  }
}
