import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
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

function EditingHighlight() {
  const router = useRouter();
  const [editingHighlight, setEditingHighlight] = useAtom(
    uploadAtom.editingHighlight,
  );
  const { control, watch, getValues, setValue } = useForm<FormValues>({
    defaultValues: {
      title: editingHighlight?.title || '',
      desc: editingHighlight?.desc || '',
    },
  });

  useEffect(() => {
    if (!editingHighlight) return;
    setValue('title', editingHighlight?.title || '');
    setValue('desc', editingHighlight?.desc || '');
  }, [editingHighlight]);

  const { uploading, editing, updateHighlight } = useUpload();

  const handlePost = () => {
    updateHighlight(editingHighlight?.id!, getValues().title, getValues().desc);
  };

  const handleAddMusic = () => {
    router.push('/edit?step=music&mode=edit');
  };

  const titleValue = watch('title');

  return (
    <HeaderTemplate
      title="Edit"
      rightNode={
        <Button
          isLoading={uploading}
          isDisabled={!titleValue}
          onClick={handlePost}
          variant="ghost"
        >
          DONE
        </Button>
      }
    >
      <section className="w-full space-y-8 p-4">
        <div className="px-4">
          <Swiper spaceBetween={8} slidesPerView={2}>
            {editingHighlight?.highlightImage.map((x) => {
              return (
                <SwiperSlide key={x.id.toString()}>
                  <div className="flex h-full items-center bg-gray-900">
                    <img
                      className="w-full rounded-md object-contain"
                      alt={x.key}
                      src={x.url}
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
        <div className="py-4">
          <button
            type="button"
            onClick={handleAddMusic}
            className="clearButton flex w-full flex-col items-center justify-center gap-1"
          >
            <FaPlus />
            <p className="text-sm text-gray-100">Choose another songs</p>
          </button>
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default EditingHighlight;
