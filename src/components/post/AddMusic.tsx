import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';

import { searchSongApi } from '@/hooks/song/api';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Song } from '@/types/server.type';

import Greeting from '../header/Gretting';
import { Input } from '../ui/input';
import AddMusicItem from './AddMusicItem';

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
              <AddMusicItem key={`add-music-${song.spotifyId}`} song={song} />
            );
          })}
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default AddMusic;
