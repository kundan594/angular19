import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {
  private isAuthenticated = false; // Replace with real auth logic

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  @Input() set appAuth(condition: boolean) {
    this.isAuthenticated = condition;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}