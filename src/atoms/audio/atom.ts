import { atom } from 'jotai';

import type { Highlight, Song } from '@/types/server.type';

export const playingAudio = atom<Song | null>(null);
export const playingHighlight = atom<Highlight | null>(null);
export const playingAudioList = atom<Song[]>([]);
export const audioBuffering = atom<boolean>(false);
