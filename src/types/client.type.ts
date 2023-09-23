export type UploadingImage = {
  id: Number;
  file: File | Blob;
  src: string;
  name: string;
  width: number;
  height: number;
  ratio: number;
  croppedBlob: Blob | null;
  defaultCropY: number;
};
