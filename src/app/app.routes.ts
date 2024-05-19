import { Routes } from '@angular/router';
import { PostsComponent } from '../posts/posts/posts.component';
import { PostComponent } from '../posts/post/post.component';
import { CommentsComponent } from '../comments/comments/comments.component';
import { CommentComponent } from '../comments/comment/comment.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PostsComponent,
      },
      {
        path: ':id',
        component: PostComponent,
      },
    ],
  },
  {
    path: 'comments',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CommentsComponent,
      },
      {
        path: ':id',
        component: CommentComponent,
      },
    ],
  },
];
