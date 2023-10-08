'use client';

import colors from 'color';
import { useAtom } from 'jotai';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

import authAtom from '@/atoms/auth';
import uploadAtom from '@/atoms/upload';
import AddMusicItem from '@/components/global/AddMusicItem';
import { StrictModeDroppable } from '@/components/global/StricModeDroppable';
import { useUpload } from '@/hooks/upload';
import type { Song } from '@/types/server.type';

const getItemStyle = (isDragging, draggableStyle) => ({
  boxShadow: isDragging ? `0px 7px 10px 0px ${colors.gray[800]}` : 'none',
  ...draggableStyle,
});

function MusicItemWrapper({ song, index }: { song: Song; index: number }) {
  const { handleDeleteSong } = useUpload();

  return (
    <Draggable draggableId={song.isrc} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
          )}
        >
          <AddMusicItem
            handleDelete={handleDeleteSong}
            song={song}
            draggable
            deleteable
          />
        </div>
      )}
    </Draggable>
  );
}

function SongController() {
  const [songList, setSongList] = useAtom(authAtom.selectedPickSong);
  const [editingHighlight, setEditingHighlight] = useAtom(
    uploadAtom.editingHighlight,
  );

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    // setSongList((prev) => {
    //   const items = [...prev];
    //   const [removed] = items.splice(startIndex, 1);
    //   if (!removed) return prev;
    //   items.splice(endIndex, 0, removed);
    //   return items;
    // });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col"
          >
            {songList.map((x, i) => {
              return <MusicItemWrapper key={x.isrc} song={x} index={i} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

export default SongController;
