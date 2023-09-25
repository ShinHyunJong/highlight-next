import { atom } from 'jotai';

import type { Song } from '@/types/server.type';

export const playingAudio = atom<Song | null>(null);
