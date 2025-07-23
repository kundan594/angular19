import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  ngOnInit(): void { 
    this.someObservable$ = new Observable<NewsItem>((subscriber) => {
      setTimeout(
        () => subscriber.next({ category: 'Business', content: 'A' }),
        1000
      );
      setTimeout(
        () => subscriber.next({ category: 'Sports', content: 'B' }),
        3000
      );
      setTimeout(
        () => subscriber.next({ category: 'Business', content: 'C' }),
        4000
      );
      setTimeout(
        () => subscriber.next({ category: 'Sports', content: 'D' }),
        6000
      );
      setTimeout(
        () => subscriber.next({ category: 'Business', content: 'E' }),
        7000
      );
    });

     this.sportsNewsFeedfilter$ = this.someObservable$.pipe(
      filter((item) => item.category === 'Sports')
    );

  }
}
