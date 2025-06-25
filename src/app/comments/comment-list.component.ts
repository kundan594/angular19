import { Component, OnInit, ViewChildren, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from './comment.service';
import { CommentCardComponent } from './comment-card.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentCardComponent],
  template: `
    <h2>Comments</h2>
    <button (click)="addDummyComment()">Add Dummy Comment</button>
    <div *ngFor="let comment of commentService.comments()">
      <app-comment-card [comment]="comment">
        <div #cardAction card-actions>
          <button (click)="delete(comment.id)">Delete</button>
        </div>
      </app-comment-card>
    </div>
  `
})
export class CommentListComponent implements OnInit {
  commentService = inject(CommentService);
  @ViewChildren(CommentCardComponent) commentCards!: QueryList<CommentCardComponent>;

  ngOnInit() {
    this.commentService.fetchComments();
  }

  addDummyComment() {
    this.commentService.addComment({
      body: 'This is a new comment.',
      postId: 1,
      user: 'AngularUser'
    });
  }

  delete(id: number) {
    this.commentService.deleteComment(id);
  }
}
