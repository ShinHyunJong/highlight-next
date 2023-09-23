import { useAtom } from 'jotai';
import { useState } from 'react';

import uploadAtom from '@/atoms/upload';
import getCroppedImg, { compressImage, createImage } from '@/utils/image.util';
import { generateRandomNumber } from '@/utils/random';

import { postHighlightApi } from './api';

const calculateRatio = (width: number, height: number) => {
  if (width === height) {
    return 1;
  }
  if (width > height) {
    return 1.91 / 1;
  }

  return 4 / 5;
};

export function useUpload() {
  const [uploadingImageList, setUploadImageList] = useAtom(
    uploadAtom.uploadingImageList,
  );
  const [staticUploadingImageList, setStaticUploadingImageList] = useAtom(
    uploadAtom.staticUploadingImageList,
  );
  const [processing, setIsProcessing] = useState(false);

  const postHighlight = async () => {
    const formData = new FormData();
    const imageList = await Promise.all(
      uploadingImageList.map(async (x) => {
        if (x.croppedBlob) {
          return x.croppedBlob;
        }
        const defaultCropped = await getCroppedImg(x.src, {
          width: x.width,
          height: x.height,
          x: 0,
          y: x.defaultCropY,
        });
        return defaultCropped;
      }),
    );

    formData.append('title', 'test');
    for (let i = 0; i < imageList.length; i += 1) {
      // formData.append(`file_name_list[${i}]`, imageList[i].name);
      formData.append(`imageList[]`, imageList[i]!);
    }
    await postHighlightApi(formData);
  };

  const processFileList = async (files: File[] | Blob[]) => {
    setIsProcessing(true);
    try {
      const fileList = [...files];
      const result = await Promise.all(
        fileList.map(async (file) => {
          const { url, compressedResult } = await compressImage(file, 0.7);
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
            ratio: calculateRatio(image.width, image.height),
            croppedBlob: null,
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
  return {
    postHighlight,
    uploadingImageList,
    processFileList,
    processing,
  };
}
