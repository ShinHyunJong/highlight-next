import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { Song } from '@/types/server.type';

export const selectedPickSong = atomWithStorage<Song[]>('@auth.top3Songs', []);
export const signInLoading = atom<boolean>(false);
