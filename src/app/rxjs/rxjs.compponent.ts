import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rxjs',
  standalone: true,
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.css',
  imports: [CommonModule]
})
export class rxjs implements OnInit {
     someObservable$!:Observable<string>;
  ngOnInit(): void {
   this.someObservable$ = new Observable<string>((subscriber) => {
      subscriber.next('Alice');
      subscriber.next('Ben');
      subscriber.next('Charlie22');
      subscriber.complete();
    });

    // someObservable$.subscribe((value) => console.log(value));
  }
}
