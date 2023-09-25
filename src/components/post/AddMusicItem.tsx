import { useAtom } from 'jotai';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { Levels } from 'react-activity';

import audioAtom from '@/atoms/audio';
import { AudioContext } from '@/contexts/AudioContext';
import type { Song } from '@/types/server.type';

type AddMusicItemProps = {
  song: Song;
};

function AddMusicItem({ song }: AddMusicItemProps) {
  const [playing, setPlaying] = useState(false);
  const { changeAudio, pause } = useContext(AudioContext);
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);

  const handlePlay = () => {
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

  const active = playingAudio?.spotifyId === song.spotifyId;

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="clearButton flex w-full flex-row justify-between p-4"
    >
      <div className="flex flex-1 flex-row items-center gap-3">
        <Image
          className="object-fill"
          width={40}
          height={40}
          alt={song.title}
          src={song.thumbUrl}
        />
        <div className="flex flex-col gap-1 text-left">
          <p className="text-sm font-semibold">{song.title}</p>
          <p className="text-sm text-gray-500">{song.artistName}</p>
        </div>
      </div>
      <div>{active && <Levels />}</div>
    </button>
  );
}

export default AddMusicItem;
