import { Component, Input, ContentChildren, QueryList, AfterContentInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from './comment.model';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="comment-card">
      <strong>{{ commentSignal().user }}</strong>
      <p>{{ commentSignal().body }}</p>
      <ng-content></ng-content>
      <div class="actions">
        <ng-content select="[card-actions]"></ng-content>
      </div>
      <div class="content-children-info">
        <p>Projected actions: {{ actions.length }}</p>
      </div>
    </div>
  `,
  styles: [`
    .comment-card { border: 1px solid #90caf9; margin-bottom: 12px; padding: 12px; border-radius: 4px; }
    .actions { margin-top: 8px; }
    .content-children-info { font-size: 0.9em; color: #888; margin-top: 8px; }
  `]
})
export class CommentCardComponent implements AfterContentInit {
  private _comment = signal<Comment>({ id: 0, body: '', postId: 0, user: '' });
  @Input() set comment(value: Comment) { this._comment.set(value); }
  commentSignal = this._comment;

  @ContentChildren('cardAction', { descendants: true }) actions!: QueryList<any>;

  ngAfterContentInit() {}
}
