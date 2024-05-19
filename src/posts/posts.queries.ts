import { inject, Signal } from '@angular/core';
import { PostsService } from './posts.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { postsKeys } from './posts.query-keys';
import { lastValueFrom } from 'rxjs';

export const injectAllPosts = () => {
  const postsService = inject(PostsService);
  return injectQuery(() => ({
    queryKey: postsKeys.all(),
    queryFn: () => lastValueFrom(postsService.getAllPosts()),
    staleTime: 10000,
  }));
};

export const injectPostList = (filter: Signal<string>) => {
  const postsService = inject(PostsService);
  return injectQuery(() => ({
    queryKey: postsKeys.list(filter()),
    queryFn: () => lastValueFrom(postsService.getPostsList(filter())),
    staleTime: 10000,
  }));
};

export const injectPostDetail = (postId: Signal<string>) => {
  const postsService = inject(PostsService);
  return injectQuery(() => ({
    queryKey: postsKeys.detail(postId()),
    queryFn: () => lastValueFrom(postsService.getPost(postId())),
    staleTime: 10000,
  }));
};
