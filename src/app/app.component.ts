import { Component } from '@angular/core';
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, Router, RouterOutlet, RoutesRecognized } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyLibComponent  } from 'my-lib';
import { PdfViewerComponent } from './pdf-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, WelcomeComponent ,UsersComponent, RouterOutlet,MyLibComponent,PdfViewerComponent],
})
export class AppComponent {
title = 'employee-list';
 constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event);
      }
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
      }
      if (event instanceof NavigationCancel) {
        console.log('NavigationCancel:', event);
      }
      if (event instanceof NavigationError) {
        console.log('NavigationError:', event);
      }
      if (event instanceof RoutesRecognized) {
        console.log('RoutesRecognized:', event);
      }
      if (event instanceof GuardsCheckStart) {
        console.log('GuardsCheckStart:', event);
      }
      if (event instanceof GuardsCheckEnd) {
        console.log('GuardsCheckEnd:', event);
      }
      if (event instanceof ResolveStart) {
        console.log('ResolveStart:', event);
      }
      if (event instanceof ResolveEnd) {
        console.log('ResolveEnd:', event);
      }
      if (event instanceof ChildActivationStart) {
        console.log('ChildActivationStart:', event);
      }
      if (event instanceof ChildActivationEnd) {
        console.log('ChildActivationEnd:', event);
      }
      if (event instanceof ActivationStart) {
        console.log('ActivationStart:', event);
      }
      if (event instanceof ActivationEnd) {
        console.log('ActivationEnd:', event);
      }
    });
  }
}

