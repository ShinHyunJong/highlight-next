import { atom } from 'jotai';

import type { UploadingImage } from '@/types/client.type';
import type { Highlight, Song } from '@/types/server.type';

export const uploading = atom<boolean>(false);
export const uploadingImageList = atom<UploadingImage[]>([]);
export const uploadingSongList = atom<Song[]>([]);
export const staticUploadingImageList = atom<UploadingImage[]>([]);

export const editing = atom<boolean>(false);
export const editingHighlight = atom<Highlight | null>(null);

export const deleting = atom<boolean>(false);
export const deletingSongList = atom<Song[]>([]);

export const addMusicModalOpen = atom<boolean>(false);
