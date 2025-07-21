import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyLibComponent  } from 'my-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, WelcomeComponent ,UsersComponent, RouterOutlet,MyLibComponent],
})
export class AppComponent {
title = 'employee-list';
}

