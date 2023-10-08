import clsx from 'clsx';
import { useRef, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import { useOutsideClick } from '@/hooks/utils/click.utils';

type ItemSettingProps = {
  onClickEdit: () => void;
  onClickRemove: () => void;
};

function ItemSetting({ onClickEdit, onClickRemove }: ItemSettingProps) {
  const [open, setOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);
  useOutsideClick(settingRef, () => setOpen(false));

  const handleEdit = () => {
    onClickEdit();
  };

  const handleRemove = () => {
    onClickRemove();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="clearButton absolute right-1 top-1 z-10"
      >
        <BiDotsVerticalRounded size={16} />
      </button>
      <div
        ref={settingRef}
        className={clsx(
          'absolute right-1 top-1 z-40 bg-beige-100',
          open ? 'flex flex-col' : 'hidden',
        )}
      >
        <button onClick={handleEdit} type="button" className="clearButton p-2">
          <p className="text-sm text-gray-900">Edit Post</p>
        </button>
        <button
          onClick={handleRemove}
          type="button"
          className="clearButton p-2"
        >
          <p className="text-sm text-gray-900">Remove</p>
        </button>
      </div>
    </>
  );
}

export default ItemSetting;
