import { inject, Signal } from '@angular/core';
import { CommentsService } from './comments.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { commentsKeys } from './comments.query-keys';
import { lastValueFrom } from 'rxjs';

export const injectCommentList = (filter: Signal<string>) => {
  const commentService = inject(CommentsService);
  return injectQuery(() => ({
    queryKey: commentsKeys.list(filter()),
    queryFn: () => lastValueFrom(commentService.getCommentsList(filter())),
    staleTime: 3000,
    gcTime: 5000,
  }));
};

export const injectCommentDetail = (commentId: Signal<string>) => {
  const commentService = inject(CommentsService);
  return injectQuery(() => ({
    queryKey: commentsKeys.detail(commentId()),
    queryFn: () => lastValueFrom(commentService.getComment(commentId())),
    staleTime: 3000,
    gcTime: 5000,
  }));
};

export const injectCommentListFromPost = (
  postId: Signal<string>,
  enabled: Signal<boolean>
) => {
  const commentService = inject(CommentsService);
  return injectQuery(() => ({
    queryKey: commentsKeys.listFromPost(postId()),
    queryFn: () => lastValueFrom(commentService.getCommentsByPostId(postId())),
    enabled: enabled(),
    staleTime: 3000,
    gcTime: 5000,
  }));
};
