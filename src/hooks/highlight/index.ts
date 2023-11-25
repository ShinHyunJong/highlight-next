import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

import { globalAtom } from '@/atoms';
import uploadAtom from '@/atoms/upload';
import type { Highlight } from '@/types/server.type';

import { getMyHighlightApi } from '../auth/api';
import { deleteHighlightApi } from '../upload/api';
import {
  getHighlightDetailApi,
  getHighlightLikeApi,
  getHighlightListApi,
  getRelatedHighlightApi,
} from './api';

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

export function useHighlightList(
  highlightList: Highlight[],
  totalCount: number,
) {
  const category = useAtomValue(globalAtom.selectedCategoryAtom);
  const isAll = !category || category === 'all';

  const {
    data,
    isLoading,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['mainFeed', category],
    ({ pageParam }) =>
      getHighlightListApi(isAll ? undefined : category, pageParam),
    {
      refetchOnWindowFocus: false,
      initialData: {
        pages: [{ highlightList: isAll ? highlightList : [], totalCount }],
        pageParams: [0],
      },
      getNextPageParam: (lastPage, allPages) => {
        const { totalCount } = lastPage;
        const accmulatUtterances = allPages.reduce(
          (acc, obj) => acc + obj.highlightList.length,
          0,
        );
        if (accmulatUtterances >= totalCount) return undefined;
        return accmulatUtterances === 20 ? 20 : accmulatUtterances;
      },
    },
  );

  return {
    fetchNextPage,
    highlightList: data?.pages?.map((x) => x.highlightList).flat() || [],
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isRefetching,
    isFetching,
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

export function useRelatedHighlight() {
  const router = useRouter();
  const highlightId = Number(router.query.highlightId);

  const { data, isLoading, refetch } = useQuery(
    ['relatedHighlight', highlightId],
    () => getRelatedHighlightApi(highlightId),
    {
      enabled: !!highlightId,
    },
  );

  return {
    relatedHighlightList: data || [],
    refetch,
    isLoading,
  };
}

export function useHighlightLike() {
  const router = useRouter();
  const highlightId = Number(router.query.highlightId);

  const { data, isLoading, refetch } = useQuery(
    ['highlightLike', highlightId],
    () => getHighlightLikeApi(highlightId),
    {
      enabled: !!highlightId,
    },
  );
  return {
    highlightLike: data,
    isLoading,
  };
}
