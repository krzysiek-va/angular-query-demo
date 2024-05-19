import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectPostList } from '../posts.queries';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';
import { PostsQueryService } from '../posts-query-wrong.service';
import { DataCachedDirective } from '../../common/data-cached.directive';
import { postsKeys } from '../posts.query-keys';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, DataCachedDirective],
  templateUrl: './posts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  searchControl = new FormControl('');
  filter = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map(filter => filter ?? '')
    ),
    { initialValue: '' }
  );
  queryKeyFactory = postsKeys.detail;
  postsListQuery = injectPostList(this.filter);
  // postsListQuery = inject(PostsQueryService).postsListQuery; // wrong
  // postsListQuery = inject(PostsQueryService).postListQuery(this.filter); // better
}
