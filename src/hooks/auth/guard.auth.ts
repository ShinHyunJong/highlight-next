import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useToken } from '.';

export function usePrivateGuard() {
  const { accessToken } = useToken();
  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);
}

export function usePublicGuard() {
  const { accessToken } = useToken();
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) return;
    router.replace('/?tab=profile');
  }, [accessToken]);
}
