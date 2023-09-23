import { atomWithStorage } from 'jotai/utils';
import { atomWithHash } from 'jotai-location';
import { Router } from 'next/router';

const pageAtom = atomWithHash('page', 1, {
  replaceState: true,
  subscribe: (callback) => {
    Router.events.on('routeChangeComplete', callback);
    window.addEventListener('hashchange', callback);
    return () => {
      Router.events.off('routeChangeComplete', callback);
      window.removeEventListener('hashchange', callback);
    };
  },
});

export const onboardAtom = atomWithStorage<boolean | null>('onBoarded', false);
