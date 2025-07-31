import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-custom-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="handleClick()">
      <ng-content></ng-content>
    </button>
    <div *ngIf="clicked">Clicked!</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {
  @Input() label = 'Button';
  @Input() clicked = false; // <-- If parent changes this, view may NOT update!
  @Output() buttonClick = new EventEmitter<void>();

  handleClick() {
    this.clicked = true;
    this.buttonClick.emit();
    // If 'clicked' is changed from parent, OnPush may NOT update view automatically!
  }
}