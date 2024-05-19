import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { injectCommentList } from '../comments.queries';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';
import { injectDeleteCommentMutation } from '../comments.mutations';
import { commentsKeys } from '../comments.query-keys';
import { DataCachedDirective } from '../../common/data-cached.directive';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, DataCachedDirective],
  templateUrl: './comments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  searchControl = new FormControl('');
  filter = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map(filter => filter ?? '')
    ),
    { initialValue: '' }
  );
  queryKeyFactory = commentsKeys.detail;
  commentsListQuery = injectCommentList(this.filter);
  deleteCommentMutation = injectDeleteCommentMutation();

  onDeleteComment(id: string) {
    this.deleteCommentMutation.mutate(id);
  }
}
