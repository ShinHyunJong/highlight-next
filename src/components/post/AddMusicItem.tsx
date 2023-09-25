import colors from 'color';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { Levels, Spinner } from 'react-activity';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';

import audioAtom from '@/atoms/audio';
import authAtom from '@/atoms/auth';
import type { Song } from '@/types/server.type';

type AddMusicItemProps = {
  song: Song;
  handlePlay: (song: Song) => void;
  handleAdd: (song: Song) => void;
};

function AddMusicItem({ song, handlePlay, handleAdd }: AddMusicItemProps) {
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);
  const selectedPickSong = useAtomValue(authAtom.selectedPickSong);
  const buffering = useAtomValue(audioAtom.audioBuffering);

  const active = playingAudio?.spotifyId === song.spotifyId;
  const added = selectedPickSong
    .map((s) => s.spotifyId)
    .includes(song.spotifyId);

  const renderLevel = () => {
    if (!active || !playingAudio) return null;
    if (buffering) {
      return <Spinner size={12} />;
    }
    return <Levels size={14} />;
  };

  return (
    <button
      type="button"
      onClick={() => handlePlay(song)}
      className="clearButton flex w-full flex-row items-stretch justify-between gap-2 p-2"
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
      <div className="flex items-center justify-end gap-2">
        <div>{renderLevel()}</div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAdd(song);
          }}
        >
          {added ? (
            <FaCheck />
          ) : (
            <AiOutlinePlusCircle color={colors.gray[200]} />
          )}
        </button>
      </div>
    </button>
  );
}

export default AddMusicItem;
