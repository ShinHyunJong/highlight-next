import { useAtom, useSetAtom } from 'jotai';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';

import audioAtom from '@/atoms/audio';
import authAtom from '@/atoms/auth';
import { AudioContext } from '@/contexts/AudioContext';
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
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);
  const { pause, changeAudio } = useContext(AudioContext);
  const setSelectedPickSong = useSetAtom(authAtom.selectedPickSong);

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

  const handlePlay = (song: Song) => {
    if (!song.previewUrl === null) {
      window.alert("This song doesn't have a preview.");
    }
    setPlayingAudio((prev) => {
      if (prev?.spotifyId !== song.spotifyId) {
        changeAudio(song.previewUrl);
        return song;
      }
      pause();
      return null;
    });
  };

  const handleAdd = (song: Song) => {
    setSelectedPickSong((prev) => {
      const copied = [...prev];
      const targetIndex = copied.findIndex(
        (x) => x.spotifyId === song.spotifyId,
      );
      if (targetIndex === -1) {
        copied.push(song);
      } else {
        copied.splice(targetIndex, 1);
      }
      return copied;
    });
  };

  return (
    <HeaderTemplate
      title="Select Top 3"
      rightNode={
        <button type="button" className="clearButton">
          DONE
        </button>
      }
    >
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
              <AddMusicItem
                key={`add-music-${song.spotifyId}`}
                song={song}
                handlePlay={handlePlay}
                handleAdd={handleAdd}
              />
            );
          })}
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default AddMusic;
