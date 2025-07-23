import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, catchError, concatMap, fromEvent, of } from 'rxjs';
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
  @ViewChild('endpointInput') endpointInput?: ElementRef<HTMLInputElement>;
  @ViewChild('fetchButton') fetchButton?: ElementRef<HTMLButtonElement>;

  ngOnInit(): void {
    const directors = [
  {
    type: "Director",
    name: "Christopher Nolan",
    movies: [
      { type: "Movie", title: "lll", year: 2010 },
      { type: "Movie", title: "Interstellar", year: 2014 },
      { type: "Movie", title: "lll", year: 2017 }
    ]
  },
  {
    type: "Director",
    name: "kundan Nolan",
    movies: [
      { type: "Movie", title: "kkk", year: 2010 },
      { type: "Movie", title: "Interstellar", year: 2014 },
      { type: "Movie", title: "kkk", year: 2017 }
    ]
  }
];

// Get all movies from all directors
const allMovies = directors.flatMap(director => director.movies);

// Remove duplicates by title
const uniqueMovies = Array.from(
  new Map(allMovies.map(movie => [movie.title, movie])).values()
);

console.log("unique movie with diff title",uniqueMovies);
  }

  ngAfterViewInit() {
    if (this.fetchButton && this.endpointInput) {
      fromEvent(this.fetchButton.nativeElement, 'click')
        .pipe(
          map(() => this.endpointInput!.nativeElement.value),
          concatMap((value) =>
            ajax(`https://jsonplaceholder.typicode.com/todos/${value}`).pipe(
              catchError((error) => {
                console.error('AJAX error:', error);
                return of({ error: true, message: error.message });
              })
            )
          )
        )
        .subscribe((value) => console.log(value));
    } else {
      console.error('fetchButton or endpointInput not found in the template.');
    }
  }
}
