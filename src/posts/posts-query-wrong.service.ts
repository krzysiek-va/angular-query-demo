import { inject, Injectable, Signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { postsKeys } from './posts.query-keys';
import { lastValueFrom } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostsQueryService {
  private readonly postsService = inject(PostsService);

  // wrong
  // postsListQuery = injectQuery(() => ({
  //   queryKey: postsKeys.all(),
  //   queryFn: () => lastValueFrom(this.postsService.getAllPosts()),
  // }));

  // better
  postListQuery(filter: Signal<string>) {
    return injectQuery(() => ({
      queryKey: postsKeys.list(filter()),
      queryFn: () => lastValueFrom(this.postsService.getPostsList(filter())),
    }));
  }
}
