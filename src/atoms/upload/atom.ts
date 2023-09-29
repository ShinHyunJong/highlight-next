import { atom } from 'jotai';

import type { UploadingImage } from '@/types/client.type';

export const uploading = atom<boolean>(false);
export const uploadingImageList = atom<UploadingImage[]>([]);
export const staticUploadingImageList = atom<UploadingImage[]>([]);
