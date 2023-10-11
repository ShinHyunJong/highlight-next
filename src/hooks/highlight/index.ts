import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import uploadAtom from '@/atoms/upload';
import type { Highlight } from '@/types/server.type';

import { getMyHighlightApi } from '../auth/api';
import { deleteHighlightApi } from '../upload/api';
import { getHighlightDetailApi } from './api';

export function useMyHighlight() {
  const [deleting, setDeleting] = useAtom(uploadAtom.deleting);

  const { data, isLoading, refetch } = useQuery(
    ['myHighlightList'],
    getMyHighlightApi,
  );

  const handleDelete = async (highlightId: number, callback?: () => void) => {
    try {
      setDeleting(true);
      await deleteHighlightApi(highlightId);
      setDeleting(false);
      if (callback) callback();
      refetch();
    } catch (error) {
      setDeleting(false);
    }
  };

  return {
    myHighlightList: data || [],
    refetch,
    isLoading,
    deleting,
    handleDelete,
  };
}

export function useHighlightDetail(detail?: Highlight) {
  const router = useRouter();
  const highlightId = Number(router.query.highlightId);

  const { data, isLoading, refetch } = useQuery(
    ['highlightDetail', highlightId],
    () => getHighlightDetailApi(highlightId),
    {
      initialData: detail,
      enabled: !!highlightId,
    },
  );

  return {
    highlightDetail: data,
    refetch,
    isLoading,
  };
}
