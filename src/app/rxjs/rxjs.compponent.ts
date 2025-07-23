import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
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
    // Your OnInit logic here
  }

  ngAfterViewInit() {
    fromEvent(this.sliderInput.nativeElement, 'input').pipe(
      debounceTime(2000),
      map((event: Event) => (event.target as HTMLInputElement).value)
    ).subscribe(value => console.log(value,"==="));
  }
}
