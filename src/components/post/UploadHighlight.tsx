import { useAtomValue } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { Swiper, SwiperSlide } from 'swiper/react';

import authAtom from '@/atoms/auth';
import uploadAtom from '@/atoms/upload';

import { Input } from '../ui/input';
import SongController from './components/SongController';

type FormValues = {
  title: string;
  desc: string;
};

function UploadHighlight() {
  const songList = useAtomValue(authAtom.selectedPickSong);
  const imageList = useAtomValue(uploadAtom.uploadingImageList);
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      title: '',
      desc: '',
    },
  });
  return (
    <section className="w-full space-y-8 p-4">
      <div className="px-4">
        <Swiper className="h-full w-full" spaceBetween={8} slidesPerView={2}>
          {imageList.map((x) => {
            return (
              <SwiperSlide key={x.id.toString()}>
                <img className="w-full rounded-md" alt={x.name} src={x.src} />
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
  );
}

export default UploadHighlight;
