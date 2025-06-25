import { Injectable, inject, signal } from '@angular/core';
import { API_URL } from '../shared/api.token';
import { Comment } from './comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = inject(API_URL);
  comments = signal<Comment[]>([]);

  async fetchComments() {
    const res = await fetch(`${this.apiUrl}/comments`);
    const data = await res.json();
    this.comments.set(data.comments);
  }

  addComment(comment: Omit<Comment, 'id'>) {
    const newComment: Comment = { ...comment, id: Date.now() } as Comment;
    this.comments.update(comments => [newComment, ...comments]);
  }

  deleteComment(id: number) {
    this.comments.update(comments => comments.filter(c => c.id !== id));
  }
}
