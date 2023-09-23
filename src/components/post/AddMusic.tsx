import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';

import { searchSongApi } from '@/hooks/song/api';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Song } from '@/types/server.type';

import Greeting from '../header/Gretting';
import { Input } from '../ui/input';

type FormValues = {
  term: string;
};

function AddMusic() {
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      term: '',
    },
  });

  const term = watch('term');
  const debouncedValue = useDebounce<string>(term, 500);
  const [songList, setSongList] = useState<Song[]>([]);
  const [searching, setSearching] = useState(false);

  const getSongs = async (value: string) => {
    if (!value) return;
    try {
      setSongList([]);
      setSearching(true);
      const result = await searchSongApi(value);
      setSongList(result);
      setSearching(false);
    } catch (error) {
      setSearching(false);
    }
  };

  useEffect(() => {
    getSongs(debouncedValue);
  }, [debouncedValue]);

  return (
    <HeaderTemplate title="Before you join">
      <section className="h-full w-full p-4">
        <Greeting textList={['Pick your', 'Favorite Top 3', 'Songs.!']} />
        <div className="py-8">
          <Controller
            name="term"
            control={control}
            rules={{ required: true, min: 2, max: 50 }}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type="text"
                  placeholder="Search songs."
                  isLoading={searching}
                />
              );
            }}
          />
        </div>
        <div className="flex w-full flex-col">
          {songList.map((song) => {
            return (
              <div
                key={song.appleId}
                className="flex w-full items-center gap-4 p-4"
              >
                <img
                  alt={song.title}
                  className="h-10 w-10"
                  src={song.thumbUrl}
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-500">{song.artistName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default AddMusic;
