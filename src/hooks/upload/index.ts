import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';

import authAtom from '@/atoms/auth';
import uploadAtom from '@/atoms/upload';
import type { Song } from '@/types/server.type';
import getCroppedImg, { compressImage, createImage } from '@/utils/image.util';
import { generateRandomNumber } from '@/utils/random';

import { useAudio } from '../audio';
import { useMyHighlight } from '../highlight';
import {
  deleteHighlightSongApi,
  postHighlightApi,
  updateHighlightApi,
} from './api';

const calculateRatio = (width: number, height: number) => {
  if (width === height) {
    return 1;
  }
  if (width > height) {
    return 16 / 9;
  }

  return 4 / 5;
};

export function useUpload() {
  const [uploading, setUploading] = useAtom(uploadAtom.uploading);
  const [uploadingImageList, setUploadImageList] = useAtom(
    uploadAtom.uploadingImageList,
  );
  const [selectedPickSong, setSelectedPickSong] = useAtom(
    authAtom.selectedPickSong,
  );
  const [staticUploadingImageList, setStaticUploadingImageList] = useAtom(
    uploadAtom.staticUploadingImageList,
  );
  const [processing, setIsProcessing] = useState(false);
  const [editingHighlight, setEditingHighlight] = useAtom(
    uploadAtom.editingHighlight,
  );
  const [deletingSongList, setDeleteingSongList] = useAtom(
    uploadAtom.deletingSongList,
  );
  const [editing, setEditing] = useAtom(uploadAtom.editing);
  const { refetch } = useMyHighlight();
  const router = useRouter();
  const { pause } = useAudio();

  const initialize = () => {
    setSelectedPickSong([]);
    setDeleteingSongList([]);
    setStaticUploadingImageList([]);
    setUploadImageList([]);
  };

  const postHighlight = async (
    title: string,
    desc: string,
    category: string,
  ) => {
    try {
      setUploading(true);
      const formData = new FormData();
      const imageList = uploadingImageList.map((x) => x.croppedBlob);

      const orderedSong = selectedPickSong.map((x, i) => {
        return {
          ...x,
          order: i + 1,
        };
      });

      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('category', category);
      formData.append('songList', JSON.stringify(orderedSong));
      for (let i = 0; i < imageList.length; i += 1) {
        formData.append(`imageList[]`, imageList[i]!);
      }

      await postHighlightApi(formData);
      setUploading(false);
      refetch();
      initialize();
      pause();
      router.replace('/profile');
    } catch (error) {
      setUploading(false);
    }
  };

  const completePhotoUpload = async () => {
    const photoCompletd = await Promise.all(
      uploadingImageList.map(async (x) => {
        if (x.croppedBlob) {
          return x;
        }
        const defaultCropped = await getCroppedImg(x.src, {
          width: x.width,
          height: x.height - x.defaultCropY * 2,
          x: 0,
          y: x.defaultCropY,
        });
        return {
          ...x,
          croppedBlob: defaultCropped,
          croppedUrl: URL.createObjectURL(defaultCropped!),
        };
      }),
    );
    setUploadImageList(photoCompletd);
  };

  const updateHighlight = async (
    highlightId: number,
    title: string,
    desc: string,
    category: string,
  ) => {
    try {
      setUploading(true);
      const orderInserted = selectedPickSong.map((x, i) => {
        return {
          ...x,
          order: i + 1,
        };
      });
      await updateHighlightApi(
        highlightId,
        title,
        desc,
        category,
        orderInserted,
      );
      await Promise.all(
        deletingSongList.map(async (x) => {
          if (x.id) {
            await deleteHighlightSongApi(x.id);
          }
        }),
      );
      initialize();
      router.replace('/profile');
      setUploading(false);
      setEditingHighlight(null);
      pause();
    } catch (error) {
      setUploading(false);
    }
  };

  const processFileList = async (files: File[] | Blob[]) => {
    setIsProcessing(true);
    try {
      const fileList = [...files];
      const result = await Promise.all(
        fileList.map(async (file) => {
          const { url, compressedResult } = await compressImage(file, 0.6);
          const { url: thumbSrc } = await compressImage(file, 0.1);
          const image = await createImage(url);
          const ratio = calculateRatio(image.width, image.height);
          const croppedHeight = image.width / ratio;
          const defaultCropY = Math.round((image.height - croppedHeight) / 2);
          return {
            id: generateRandomNumber(),
            file: compressedResult,
            src: url,
            thumbSrc,
            name: file.name,
            width: image.width,
            height: image.height,
            crop: { x: 0, y: 0 },
            zoom: 1,
            ratio: calculateRatio(image.width, image.height),
            croppedBlob: null,
            croppedUrl: null,
            defaultCropY,
          };
        }),
      );

      setUploadImageList(result);
      setStaticUploadingImageList(result);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
    }
  };

  const handleDeleteSong = (song: Song) => {
    setSelectedPickSong((prev) => {
      const newList = [...prev];
      const index = newList.findIndex((x) => x.isrc === song.isrc);
      newList.splice(index, 1);
      return newList;
    });
    setDeleteingSongList((prev) => {
      const newList = [...prev];
      newList.push(song);
      return newList;
    });
  };

  return {
    uploading,
    postHighlight,
    completePhotoUpload,
    uploadingImageList,
    processFileList,
    processing,
    handleDeleteSong,
    updateHighlight,
    editing,
    initialize,
  };
}
