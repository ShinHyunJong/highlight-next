import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import type { Highlight, User } from '@/types/server.type';

import { getUserDetailApi, getUserHighlightApi } from './api';

export function useUser(user: User) {
  const router = useRouter();
  const { alias } = router.query;
  const { data, isLoading } = useQuery(
    ['user', alias],
    () => getUserDetailApi(alias?.toString()!),
    {
      enabled: !!alias,
      initialData: user,
    },
  );
  return {
    user: data || null,
    isLoading,
  };
}

export function useUserHighlightList(highligtList: Highlight[]) {
  const router = useRouter();
  const { alias } = router.query;
  const { data, isLoading } = useQuery(
    ['userHighlightList', alias],
    () => getUserHighlightApi(alias?.toString()!),
    {
      enabled: !!alias,
      initialData: highligtList,
    },
  );
  return {
    highlightList: data || [],
    isLoading,
  };
}
