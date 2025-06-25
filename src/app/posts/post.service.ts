import { Injectable, inject, signal } from '@angular/core';
import { API_URL } from '../shared/api.token';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = inject(API_URL);
  posts = signal<Post[]>([]);

  async fetchPosts() {
    const res = await fetch(`${this.apiUrl}/posts`);
    const data = await res.json();
    this.posts.set(data.posts);
  }

  addPost(post: Omit<Post, 'id'>) {
    const newPost: Post = { ...post, id: Date.now() } as Post;
    this.posts.update(posts => [newPost, ...posts]);
  }

  deletePost(id: number) {
    this.posts.update(posts => posts.filter(p => p.id !== id));
  }
}
