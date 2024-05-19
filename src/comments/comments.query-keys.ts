export const commentsKeys = {
  all: () => ['comments'] as const,
  lists: () => [...commentsKeys.all(), 'list'] as const,
  list: (filter: string) => [...commentsKeys.lists(), { filter }] as const,
  details: () => [...commentsKeys.all(), 'detail'] as const,
  detail: (id: string) => [...commentsKeys.details(), id] as const,
  listFromPost: (postId: string) =>
    [...commentsKeys.lists(), 'post', postId] as const,
};
