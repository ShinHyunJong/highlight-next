import { useAtom, useAtomValue } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { Swiper, SwiperSlide } from 'swiper/react';

import uploadAtom from '@/atoms/upload';
import { useUpload } from '@/hooks/upload';
import HeaderTemplate from '@/templates/HeaderTemplate';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import SongController from './components/SongController';

type FormValues = {
  title: string;
  desc: string;
};

function UploadHighlight() {
  const imageList = useAtomValue(uploadAtom.uploadingImageList);
  const [editingHighlight, setEditingHighlight] = useAtom(
    uploadAtom.editingHighlight,
  );
  const { control, watch, getValues, setValue } = useForm<FormValues>({
    defaultValues: {
      title: '',
      desc: '',
    },
  });

  const { postHighlight, uploading } = useUpload();

  const handlePost = () => {
    postHighlight(getValues().title, getValues().desc);
  };

  const titleValue = watch('title');

  return (
    <HeaderTemplate
      title="Upload"
      rightNode={
        <Button
          isLoading={uploading}
          isDisabled={!titleValue}
          onClick={handlePost}
          variant="ghost"
        >
          UPLOAD
        </Button>
      }
    >
      <section className="w-full space-y-8 p-4">
        <div className="px-4">
          <Swiper className="h-full w-full" spaceBetween={8} slidesPerView={2}>
            {imageList.map((x) => {
              return (
                <SwiperSlide key={x.id.toString()}>
                  <div className="flex h-full items-center bg-gray-900">
                    <img
                      className="w-full rounded-md object-contain"
                      alt={x.name}
                      src={x.croppedUrl!}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="space-y-4">
          <Controller
            name="title"
            control={control}
            rules={{ required: true, min: 2, max: 50 }}
            render={({ field }) => {
              return (
                <Input {...field} type="text" placeholder="Highlight Title" />
              );
            }}
          />
          <Controller
            name="desc"
            control={control}
            rules={{ required: true, min: 2, max: 50 }}
            render={({ field }) => {
              return <Input {...field} type="text" placeholder="Caption" />;
            }}
          />
        </div>
        <div className="space-y-2">
          <p>Tracks</p>
          <SongController />
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default UploadHighlight;
