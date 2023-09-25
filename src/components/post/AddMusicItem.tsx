import { useAtom } from 'jotai';
import { useContext, useState } from 'react';
import { Levels } from 'react-activity';

import audioAtom from '@/atoms/audio';
import { AudioContext } from '@/contexts/AudioContext';
import type { Song } from '@/types/server.type';

type AddMusicItemProps = {
  song: Song;
};

export type ItemHandle = {
  play: () => void;
  pause: () => void;
} | null;

function AddMusicItem({ song }: AddMusicItemProps) {
  const [playing, setPlaying] = useState(false);
  const { changeAudio, pause } = useContext(AudioContext);
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);

  const handlePlay = () => {
    setPlayingAudio(song);
    setPlaying((p) => {
      if (!p) {
        changeAudio(song.previewUrl);
        return true;
      }
      pause();
      return false;
    });
  };

  console.log(song);

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="clearButton flex w-full items-center justify-between p-4"
    >
      <div className="flex flex-row gap-3">
        <img alt={song.title} className="h-10 w-10" src={song.thumbUrl} />
        <div className="flex flex-col items-start gap-1">
          <p className="text-sm font-semibold">{song.title}</p>
          <p className="text-sm text-gray-500">{song.artistName}</p>
        </div>
      </div>
      <div>{playingAudio?.spotifyId && song.spotifyId && <Levels />}</div>
    </button>
  );
}

export default AddMusicItem;
