import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.css',
  imports: [LoginComponent],
})
export class AppComponent9 {}
