import { Component, ContentChildren, QueryList, AfterContentInit, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from './post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-card">
      <h3>{{ post().title }}</h3>
      <p>{{ post().body }}</p>
      <ng-content></ng-content>
      <div class="actions">
        <ng-content select="[card-actions]"></ng-content>
      </div>
      <div class="tags-slot">
        <ng-content select="ul"></ng-content>
      </div>
      <ng-template #info let-title="title">
        <div class="extra-info">Info: {{ title }}</div>
      </ng-template>
      <ng-container *ngTemplateOutlet="info; context: { title: post().title }"></ng-container>
      <div class="content-children-info">
        <p>Projected actions: {{ actions.length }}</p>
      </div>
    </div>
  `,
  styles: [`
    .post-card { border: 1px solid #ccc; margin-bottom: 12px; padding: 12px; border-radius: 4px; }
    .actions { margin-top: 8px; }
    .tags-slot { margin-top: 8px; }
    .extra-info { color: #1976d2; font-weight: bold; margin-top: 8px; }
    .content-children-info { font-size: 0.9em; color: #888; margin-top: 8px; }
  `]
})
export class PostCardComponent implements AfterContentInit {
  readonly post = input.required<Post>();

  constructor() {
    effect(() => {
      console.log('Post input value:', this.post());
    });
  }

  @ContentChildren('cardAction', { descendants: true }) actions!: QueryList<any>;

  ngAfterContentInit() {}
}
