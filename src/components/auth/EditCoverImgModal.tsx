import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { FaPlus } from 'react-icons/fa';

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

function EditCoverImgModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<Blob | File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [src, setSrc] = useState('');
  const [croppedBlob, setCroppedBlob] = useState<Blob | File | null>(null);
  const { user, updateProfileImg, profileLoading } = useAuth();
  const [uploadingCoverImg, setUploadingCoverImg] = useAtom(
    authAtom.uploadingCoverImg,
  );
  const [uploadingCoverImgUrl, setUploadingCoverImgUrl] = useAtom(
    authAtom.uploadingCoverImgUrl,
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
    setUploadingCoverImg(croppedBlob);
    setUploadingCoverImgUrl(URL.createObjectURL(croppedBlob));
    setOpen(false);
  };

  return (
    <>
      <input
        onChange={handleFile}
        accept="image/*"
        type="file"
        id="uploadCover"
        className="hidden"
      />
      <label htmlFor="uploadCover">
        <FaPlus />
      </label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Cover Image</DialogTitle>
          </DialogHeader>
          <div className="relative h-[70svh]">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="rect"
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

export default EditCoverImgModal;
