import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export const usePreviousRoute = () => {
  const { asPath } = useRouter();

  const ref = useRef<string | null>(null);

  useEffect(() => {
    ref.current = asPath;
  }, [asPath]);

  return ref.current;
};

export const useTabParam = () => {
  const router = useRouter();
  const { tabFrom } = router.query;
  const isMain = router.route === '/';
  const getTabParam = () => {
    if (!tabFrom && isMain) {
      return '?tabFrom=discover';
    }
    if (!tabFrom && !isMain) {
      return '?tabFrom=profile';
    }
    if (tabFrom) {
      return `?tabFrom=${tabFrom}`;
    }
    return '';
  };
  return {
    getTabParam,
  };
};
