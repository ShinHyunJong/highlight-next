import { useQuery } from '@tanstack/react-query';

import { unionSearchApi } from './api';

export function useSearch(query: string) {
  const { data, isLoading } = useQuery(
    ['search', query],
    () => unionSearchApi(query),
    {
      enabled: !!query,
    },
  );
  return {
    userList: data?.userList || [],
    highlightList: data?.highlightList || [],
    isLoading,
  };
}
