import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { atomWithHash } from 'jotai-location';
import { Router } from 'next/router';

export const pageAtom = atomWithHash('page', 1, {
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

const selectedCategoryAtom = atom<string | null>('all');
export const globalAtom = {
  selectedCategoryAtom,
};
