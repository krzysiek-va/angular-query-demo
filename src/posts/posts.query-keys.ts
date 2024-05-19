export const postsKeys = {
  all: () => ['posts'] as const,
  lists: () => [...postsKeys.all(), 'list'] as const,
  list: (filter: string) => [...postsKeys.lists(), { filter }] as const,
  details: () => [...postsKeys.all(), 'detail'] as const,
  detail: (id: string) => [...postsKeys.details(), id] as const,
};
