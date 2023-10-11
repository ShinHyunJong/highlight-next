import { useSetAtom } from 'jotai';
import { FaPlus } from 'react-icons/fa';

import uploadAtom from '@/atoms/upload';

function AddMusicButton() {
  const setOpen = useSetAtom(uploadAtom.addMusicModalOpen);
  return (
    <div className="py-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="clearButton flex w-full flex-col items-center justify-center gap-1"
      >
        <FaPlus />
        <p className="text-sm text-gray-100">Choose another songs</p>
      </button>
    </div>
  );
}

export default AddMusicButton;
