import clsx from 'clsx';
import colors from 'color';
import { useRef, useState } from 'react';
import { Spinner } from 'react-activity';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import { useMyHighlight } from '@/hooks/highlight';
import { useOutsideClick } from '@/hooks/utils/click.utils';

type ItemSettingProps = {
  onClickEdit: () => void;
  onClickRemove: () => void;
};

function ItemSetting({ onClickEdit, onClickRemove }: ItemSettingProps) {
  const [open, setOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);
  const { deleting } = useMyHighlight();
  useOutsideClick(settingRef, () => setOpen(false));

  const handleEdit = (e) => {
    e.preventDefault();
    onClickEdit();
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onClickRemove();
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
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
        {deleting ? (
          <div className="p-4">
            <Spinner size={12} color={colors.gray[900]} />
          </div>
        ) : (
          <>
            {' '}
            <button
              onClick={handleEdit}
              type="button"
              className="clearButton p-2"
            >
              <p className="text-sm text-gray-900">Edit Post</p>
            </button>
            <button
              onClick={handleRemove}
              type="button"
              className="clearButton p-2"
            >
              <p className="text-sm text-gray-900">Remove</p>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default ItemSetting;
