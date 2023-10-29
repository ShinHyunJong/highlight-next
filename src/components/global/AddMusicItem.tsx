import colors from 'color';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Levels, Spinner } from 'react-activity';
import { Draggable } from 'react-beautiful-dnd';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { LuMusic2 } from 'react-icons/lu';
import { MdClose, MdDragHandle } from 'react-icons/md';

import audioAtom from '@/atoms/audio';
import authAtom from '@/atoms/auth';
import uploadAtom from '@/atoms/upload';
import type { Song } from '@/types/server.type';

type AddMusicItemProps = {
  song: Song;
  onClick?: (song: Song) => void;
  handleAdd?: (song: Song) => void;
  handleDelete?: (song: Song) => void;
  selection?: boolean;
  deleteable?: boolean;
  draggable?: boolean;
  index: number;
};

function AddMusicItem({
  index,
  song,
  onClick,
  handleAdd,
  handleDelete,
  selection,
  deleteable,
  draggable,
}: AddMusicItemProps) {
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);
  const selectedPickSong = useAtomValue(authAtom.selectedPickSong);
  const setDeletingSong = useSetAtom(uploadAtom.deletingSongList);
  const buffering = useAtomValue(audioAtom.audioBuffering);

  const active = playingAudio?.isrc === song.isrc;
  const added = selectedPickSong.map((s) => s.isrc).includes(song.isrc);

  const getItemStyle = (isDragging, draggableStyle) => ({
    boxShadow: isDragging ? `0px 7px 10px 0px ${colors.gray[800]}` : 'none',
    ...draggableStyle,
  });

  const renderLevel = () => {
    if (!active && !draggable && song.previewUrl) return <LuMusic2 />;
    if (!active || !playingAudio) return null;

    if (buffering) {
      return <Spinner size={12} />;
    }
    return <Levels size={14} />;
  };

  const renderItem = (provided, draggable) => {
    return (
      <li
        aria-hidden="true"
        onClick={() => onClick && onClick(song)}
        className="clearButton relative flex w-full flex-row items-stretch justify-between gap-2 p-2"
      >
        {active && (
          <div
            style={{ height: `calc(100% + 20px)` }}
            className="active-music-item absolute inset-0 w-full"
          />
        )}
        <div className="flex flex-1 flex-row items-center gap-3">
          {provided && draggable && (
            <div {...provided.dragHandleProps}>
              <MdDragHandle />
            </div>
          )}
          <img
            className="object-fill"
            width={40}
            height={40}
            alt={song.title}
            src={song.thumbUrl}
          />
          <div className="flex flex-col gap-1 text-left">
            <p className="text-sm font-semibold">{song.title}</p>
            <p className="text-sm text-gray-400">{song.artistName}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <div>{renderLevel()}</div>
          {selection && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (handleAdd) {
                  handleAdd(song);
                }
              }}
            >
              {added ? (
                <FaCheck />
              ) : (
                <AiOutlinePlusCircle color={colors.gray[200]} />
              )}
            </button>
          )}
          {!selection && deleteable && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (handleDelete) {
                  handleDelete(song);
                }
              }}
            >
              <MdClose />
            </button>
          )}
        </div>
      </li>
    );
  };

  if (draggable) {
    return (
      <Draggable draggableId={song.isrc} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
          >
            {renderItem(provided, true)}
          </div>
        )}
      </Draggable>
    );
  }
  return <>{renderItem(null, false)}</>;
}

export default AddMusicItem;
