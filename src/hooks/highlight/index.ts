import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import uploadAtom from '@/atoms/upload';

import { getMyHighlightApi } from '../auth/api';
import { deleteHighlightApi } from '../upload/api';

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
