'use client';

import { useAtom } from 'jotai';
import { DragDropContext } from 'react-beautiful-dnd';

import authAtom from '@/atoms/auth';
import uploadAtom from '@/atoms/upload';
import AddMusicItem from '@/components/global/AddMusicItem';
import { StrictModeDroppable } from '@/components/global/StricModeDroppable';
import { useUpload } from '@/hooks/upload';

function SongController() {
  const [songList, setSongList] = useAtom(authAtom.selectedPickSong);
  const [editingHighlight, setEditingHighlight] = useAtom(
    uploadAtom.editingHighlight,
  );
  const { handleDeleteSong } = useUpload();

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    setSongList((prev) => {
      const items = [...prev];
      const [removed] = items.splice(startIndex, 1);
      if (!removed) return prev;
      items.splice(endIndex, 0, removed);
      return items;
    });
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
              return (
                <AddMusicItem
                  draggable
                  key={x.isrc}
                  song={x}
                  index={i}
                  deleteable
                  handleDelete={handleDeleteSong}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

export default SongController;
