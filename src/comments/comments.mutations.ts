import { injectMutation } from '@tanstack/angular-query-experimental';
import { inject } from '@angular/core';
import { CommentsService } from './comments.service';
import { lastValueFrom } from 'rxjs';
import { commentsKeys } from './comments.query-keys';

export const injectDeleteCommentMutation = () => {
  const commentService = inject(CommentsService);

  return injectMutation(queryClient => ({
    mutationFn: async (id: string) =>
      lastValueFrom(commentService.deleteComment(id)),
    onSuccess: (_, id: string) => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.lists() });
      // queryClient.invalidateQueries({queryKey: commentsKeys.detail(id)});
    },
  }));
};
