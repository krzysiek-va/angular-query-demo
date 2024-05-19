import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { injectCommentListFromPost } from '../../comments/comments.queries';
import { injectPostDetail } from '../posts.queries';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  readonly id = input.required<string>();
  showComments = signal(true);
  postQuery = injectPostDetail(this.id);
  commentsQuery = injectCommentListFromPost(this.id, this.showComments);
}
