import { useAtom } from 'jotai';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import authAtom from '@/atoms/auth';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/auth';
import getCroppedImg, { compressImage } from '@/utils/image.util';

import { Button } from '../ui/button';

function EditProfileImgModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<Blob | File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [src, setSrc] = useState('');
  const [croppedBlob, setCroppedBlob] = useState<Blob | File | null>(null);
  const { user, updateProfileImg, profileLoading } = useAuth();
  const [uploadingProfileImg, setUploadingProfileImg] = useAtom(
    authAtom.uploadingProfileImg,
  );
  const [uploadingProfileImgUrl, setUploadingProfileImgUrl] = useAtom(
    authAtom.uploadingProfileImgUrl,
  );

  const handleFile = async (e: any) => {
    const { files } = e.target;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const { url, compressedResult } = await compressImage(file, 0.6);
    setSrc(url);
    setOpen(true);
  };

  const onCropComplete = useCallback(
    async (croppedArea, croppedAreaPixels) => {
      if (!src) return;
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      setCroppedBlob(croppedImage);
    },
    [src],
  );

  const handleZoom = (z: number) => {
    setZoom(z);
  };

  const handleCrop = (c) => {
    setCrop(c);
  };

  const handleConfirm = async () => {
    if (!croppedBlob) return;
    setUploadingProfileImg(croppedBlob);
    setUploadingProfileImgUrl(URL.createObjectURL(croppedBlob));
    setOpen(false);
  };

  return (
    <>
      <input
        onChange={handleFile}
        accept="image/*"
        type="file"
        id="uploadProfile"
        className="hidden"
      />
      <label
        htmlFor="uploadProfile"
        className="cursor-pointer rounded-full bg-white"
      >
        {(uploadingProfileImg || user?.profileImgUrl) && (
          <Image
            alt="profileImg"
            width={30}
            className="rounded-full"
            height={30}
            src={uploadingProfileImgUrl || user?.profileImgUrl || ''}
          />
        )}
      </label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Profile Image</DialogTitle>
          </DialogHeader>
          <div className="relative h-[70svh]">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={handleCrop}
              onCropComplete={onCropComplete}
              onZoomChange={handleZoom}
            />
          </div>
          <DialogFooter>
            <Button isLoading={profileLoading} onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditProfileImgModal;
