import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import uploadAtom from '@/atoms/upload';
import { useUpload } from '@/hooks/upload';
import HeaderTemplate from '@/templates/HeaderTemplate';

import CategorySelector from '../global/CategorySelector';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
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
  const [category, setCategory] = useState<string | null>(null);

  const handlePost = () => {
    if (!category) return;
    postHighlight(getValues().title, getValues().desc, category);
  };

  const titleValue = watch('title');

  return (
    <HeaderTemplate
      title="Upload"
      hasFooter={false}
      rightNode={
        <Button
          isLoading={uploading}
          isDisabled={!titleValue || !category}
          onClick={handlePost}
          variant="ghost"
        >
          UPLOAD
        </Button>
      }
    >
      <section className="w-full space-y-8 p-4">
        <div className="px-4">
          <Swiper
            modules={[Pagination]}
            className="h-full w-full"
            spaceBetween={8}
            slidesPerView={2}
          >
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
              return <Textarea {...field} rows={5} placeholder="Caption" />;
            }}
          />
        </div>
        <div className="space-y-2">
          <p>Pick Your Category</p>
          <CategorySelector value={category} onChange={setCategory} />
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
