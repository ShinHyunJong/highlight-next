'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

import uploadAtom from '@/atoms/upload';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { UploadingImage } from '@/types/client.type';
import getCroppedImg from '@/utils/image.util';

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (staticUploadingImageList.length === 0) return;
    setSelectedImage(staticUploadingImageList[0]);
  }, [staticUploadingImageList]);

  const onSubmit = () => {};

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
        });
        return copied;
      });
    },
    [selectedImage, setUploadingImageList],
  );

  const handleThumb = (img: UploadingImage) => {
    setSelectedImage(img);
  };

  return (
    <HeaderTemplate
      title="Select Photo"
      rightNode={
        <button
          type="button"
          // onClick={postHighlight}
          onClick={() => router.push('/post?step=music&mode=upload')}
          className="clearButton"
        >
          <p>NEXT</p>
        </button>
      }
    >
      <section className="flex h-full w-full flex-col justify-between">
        <div
          style={{ height: `calc(100% - ${thumbContainerH}px)` }}
          className="relative flex w-full flex-col"
        >
          {selectedImage && (
            <Cropper
              image={selectedImage.src}
              crop={crop}
              zoom={zoom}
              aspect={selectedImage.ratio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
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
