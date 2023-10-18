import { atom } from 'jotai';

import type { Song } from '@/types/server.type';

export const playingAudio = atom<Song | null>(null);
export const playingAudioList = atom<Song[]>([]);
export const audioBuffering = atom<boolean>(false);
