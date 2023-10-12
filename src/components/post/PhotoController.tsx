'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import router from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Cropper from 'react-easy-crop';

import uploadAtom from '@/atoms/upload';
import { useUpload } from '@/hooks/upload';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { CropPos, UploadingImage } from '@/types/client.type';
import getCroppedImg from '@/utils/image.util';

import { Button } from '../ui/button';

const thumbContainerH = 82;

function PhotoController() {
  const [uploadingImageList, setUploadingImageList] = useAtom(
    uploadAtom.uploadingImageList,
  );
  const [staticUploadingImageList, setStatic] = useAtom(
    uploadAtom.staticUploadingImageList,
  );
  const [selectedImage, setSelectedImage] = useState<
    UploadingImage | undefined
  >(undefined);
  const { completePhotoUpload } = useUpload();
  const [photoUploading, setPhotoUploading] = useState(false);

  useEffect(() => {
    if (staticUploadingImageList.length === 0) return;
    setSelectedImage(staticUploadingImageList[0]);
  }, [staticUploadingImageList]);

  const onSubmit = () => {};

  const renderedImage = useMemo(
    () => uploadingImageList.find((x) => x.id === selectedImage?.id),
    [uploadingImageList, selectedImage],
  );

  const handleNext = async () => {
    setPhotoUploading(true);
    await completePhotoUpload();
    router.push('/post?step=music&mode=upload');
    setPhotoUploading(false);
  };

  const onCropComplete = useCallback(
    async (croppedArea, croppedAreaPixels) => {
      if (!selectedImage) return;
      const croppedImage = await getCroppedImg(
        selectedImage.src,
        croppedAreaPixels,
      );
      setUploadingImageList((prev) => {
        const copied = [...prev];
        const targetIndex = prev.findIndex((x) => x.id === selectedImage.id);
        const target = prev[targetIndex];
        if (!target) return prev;
        copied.splice(targetIndex, 1, {
          ...target,
          croppedBlob: croppedImage,
          croppedUrl: URL.createObjectURL(croppedImage!),
        });
        return copied;
      });
    },
    [renderedImage, setUploadingImageList],
  );

  const handleThumb = (img: UploadingImage) => {
    setSelectedImage(img);
  };

  const handleZoom = (z: number) => {
    if (!selectedImage) return;
    setUploadingImageList((prev) => {
      const copied = [...prev];
      const targetIndex = prev.findIndex((x) => x.id === selectedImage.id);
      const target = prev[targetIndex];
      if (!target) return prev;
      copied.splice(targetIndex, 1, {
        ...target,
        zoom: z,
      });
      return copied;
    });
  };

  const handleCrop = (c: CropPos) => {
    if (!selectedImage) return;
    setUploadingImageList((prev) => {
      const copied = [...prev];
      const targetIndex = prev.findIndex((x) => x.id === selectedImage.id);
      const target = prev[targetIndex];
      if (!target) return prev;
      copied.splice(targetIndex, 1, {
        ...target,
        crop: c,
      });
      return copied;
    });
  };

  return (
    <HeaderTemplate
      title="Select Photo"
      hasFooter={false}
      rightNode={
        <Button
          type="button"
          variant="ghost"
          isLoading={photoUploading}
          // onClick={postHighlight}
          onClick={handleNext}
          className="clearButton"
        >
          <p>NEXT</p>
        </Button>
      }
    >
      <section
        style={{ height: `calc(100svh - 50px)` }}
        className="flex w-full flex-col justify-between"
      >
        <div
          style={{ height: `calc(100% - ${thumbContainerH}px)` }}
          className="relative flex w-full flex-col"
        >
          {renderedImage && (
            <Cropper
              image={renderedImage.src}
              crop={renderedImage.crop}
              zoom={renderedImage.zoom}
              aspect={renderedImage.ratio}
              onCropChange={handleCrop}
              onCropComplete={onCropComplete}
              onZoomChange={handleZoom}
            />
          )}
        </div>
        <div className="flex" style={{ height: thumbContainerH }}>
          {uploadingImageList.map((image) => {
            const selected = selectedImage?.id === image.id;
            return (
              <button
                type="button"
                onClick={() => handleThumb(image)}
                key={`${image.id}`}
                className="clearButton"
              >
                <img
                  alt={`${image.id}`}
                  className={clsx(
                    'h-20 w-20 border-2 border-solid object-cover',
                    selected ? 'border-slate-100' : 'border-slate-900',
                  )}
                  src={image.thumbSrc}
                />
              </button>
            );
          })}
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default PhotoController;
