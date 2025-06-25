import { Component, OnInit, ViewChildren, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { PostCardComponent } from './post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  template: `
    <h2>Posts</h2>
    <button (click)="addDummyPost()">Add Dummy Post</button>
    <div *ngFor="let post of postService.posts()">
      <app-post-card [post]="post">
        <div #cardAction card-actions>
          <button (click)="delete(post.id)">Delete</button>
        </div>
        <ul>
          <li *ngFor="let tag of post.tags">{{ tag }}</li>
        </ul>
      </app-post-card>
    </div>
  `
})
export class PostListComponent implements OnInit {
  postService = inject(PostService);
  @ViewChildren(PostCardComponent) postCards!: QueryList<PostCardComponent>;

  ngOnInit() {
    this.postService.fetchPosts();
  }

  addDummyPost() {
    this.postService.addPost({
      title: 'New Post',
      body: 'This is a new post.',
      userId: 1,
      tags: ['angular', 'signal']
    });
  }

  delete(id: number) {
    this.postService.deletePost(id);
  }
}
