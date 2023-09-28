import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import authAtom from '@/atoms/auth';

export function usePublicGuard() {
  const accessToken = useAtomValue(authAtom.accessToken);
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) return;
    router.replace('/?tab=profile');
  }, [accessToken]);
}
