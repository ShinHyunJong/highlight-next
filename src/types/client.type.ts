export type CropPos = {
  x: number;
  y: number;
};

export type UploadingImage = {
  id: Number;
  file: File | Blob;
  src: string;
  thumbSrc: string;
  name: string;
  width: number;
  height: number;
  ratio: number;
  croppedBlob: Blob | null;
  croppedUrl: string | null;
  defaultCropY: number;
  crop: CropPos;
  zoom: number;
};
