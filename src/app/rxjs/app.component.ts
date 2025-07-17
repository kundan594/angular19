import { Component, DestroyRef, OnInit, inject } from '@angular/core';

import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
   styleUrl: './app.css'
})
export class AppComponent7 implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = interval(1000).subscribe({
      next: (val) => console.log(val)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
