import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
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
    // Mike is from New Delhi and likes to eat pasta.

    const randomFirstName$ = ajax<any>(
      'https://random-data-api.com/api/name/random_name'
    ).pipe(map((ajaxResponse) => ajaxResponse.response.first_name));

    const randomCapital$ = ajax<any>(
      'https://random-data-api.com/api/nation/random_nation'
    ).pipe(map((ajaxResponse) => ajaxResponse.response.capital));

    const randomDish$ = ajax<any>(
      'https://random-data-api.com/api/food/random_food'
    ).pipe(map((ajaxResponse) => ajaxResponse.response.dish));

    forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
      ([firstName, capital, dish]) =>
        console.log(`${firstName} is from ${capital} and likes to eat ${dish}.`)
    );
  }
}
