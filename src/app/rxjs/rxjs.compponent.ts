import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, debounceTime } from 'rxjs/operators';
interface NewsItem {
  category: 'Business' | 'Sports';
  content: string;
}

@Component({
  selector: 'rxjs',
  standalone: true,
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.css',
  imports: [CommonModule],
})
export class rxjs implements OnInit {
  someObservable$!: Observable<NewsItem>;
  sportsNewsFeedfilter$!: Observable<NewsItem[] | NewsItem>;
  @ViewChild('sliderInput') sliderInput!: ElementRef<HTMLInputElement>;
  ngOnInit(): void {
    const failingHttpRequest$ = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.error(new Error('Timeout'));
      }, 3000);
    });

    console.log('App started');
    failingHttpRequest$.pipe(catchError((error) => EMPTY)).subscribe({
      next: (value) => console.log(value,"value---"),
      complete: () => console.log('Completed'),
    });
  }

  ngAfterViewInit() {
    // fromEvent(this.sliderInput.nativeElement, 'input').pipe(
    //   debounceTime(2000),
    //   map((event: Event) => (event.target as HTMLInputElement).value)
    // ).subscribe(value => console.log(value,"==="));
  }
}
