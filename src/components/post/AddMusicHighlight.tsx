import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';

import audioAtom from '@/atoms/audio';
import authAtom from '@/atoms/auth';
import { AudioContext } from '@/contexts/AudioContext';
import { searchSongApi } from '@/hooks/song/api';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Song } from '@/types/server.type';

import AddMusicItem from '../global/AddMusicItem';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type FormValues = {
  term: string;
};

function AddMusicHighlight() {
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
  const { pause, changeAudio, audio } = useContext(AudioContext);
  const [selectedPickSong, setSelectedPickSong] = useAtom(
    authAtom.selectedPickSong,
  );
  const [audioBuffering, setAudioBuffering] = useAtom(audioAtom.audioBuffering);

  const router = useRouter();
  const isEdit = router.query.mode === 'edit';

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
    setAudioBuffering(true);
    if (!song.previewUrl) {
      setAudioBuffering(false);
      window.alert("This song doesn't have a preview.");
    } else {
      setPlayingAudio((prev) => {
        if (prev?.isrc !== song.isrc) {
          changeAudio(song.previewUrl);
          return song;
        }
        pause();
        return null;
      });
    }
  };

  const handleAdd = (song: Song) => {
    setSelectedPickSong((prev) => {
      const copied = [...prev];
      const targetIndex = copied.findIndex((x) => x.isrc === song.isrc);
      if (targetIndex === -1) {
        if (copied.length === 5) return prev;
        copied.push(song);
      } else {
        copied.splice(targetIndex, 1);
      }
      return copied;
    });
  };

  const routeToAuth = () => {
    router.push('/auth');
    pause();
    setPlayingAudio(null);
  };

  const nextRoute = isEdit ? '/edit?step=upload' : '/post?step=upload';

  return (
    <HeaderTemplate
      hasFooter={false}
      title="Add Music"
      rightNode={
        <div className="flex">
          <Button
            isDisabled={selectedPickSong.length === 0}
            onClick={() => router.push(nextRoute)}
            variant="ghost"
          >
            <p className="mr-2 text-sm text-blue-500">
              {selectedPickSong.length} / 5
            </p>
            NEXT
          </Button>
        </div>
      }
    >
      <section className="w-full p-4">
        <div className="pb-4">
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
        {!searching && (
          <ul className="flex w-full flex-col">
            {songList.map((song) => {
              return (
                <AddMusicItem
                  key={`add-music-${song.isrc}`}
                  song={song}
                  onClick={handlePlay}
                  handleAdd={handleAdd}
                  selection
                />
              );
            })}
          </ul>
        )}
      </section>
    </HeaderTemplate>
  );
}

export default AddMusicHighlight;
