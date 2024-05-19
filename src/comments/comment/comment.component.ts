import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { injectCommentDetail } from '../comments.queries';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  readonly id = input.required<string>();
  commentQuery = injectCommentDetail(this.id);
}
