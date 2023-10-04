import { useQuery } from '@tanstack/react-query';

import { getMyHighlightApi } from '../auth/api';

export function useMyHighlight() {
  const { data, isLoading } = useQuery(['myHighlightList'], getMyHighlightApi);
  return {
    myHighlightList: data || [],
    isLoading,
  };
}
