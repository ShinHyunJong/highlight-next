import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { Song } from '@/types/server.type';

export const selectedPickSong = atomWithStorage<Song[]>('@auth.top3Songs', []);
export const signInLoading = atom<boolean>(false);
export const registerSongLoading = atom<boolean>(false);
export const accessToken = atom<string | null>(null);
export const hasLogout = atom<boolean | null>(false);
