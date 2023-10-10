import clsx from 'clsx';
import { useRouter } from 'next/router';
import { type ReactNode, useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import { RouteContext } from '@/contexts/RouteContext';

function Header({
  title,
  rightNode,
  transparent,
  isModal,
  onCloseModal,
}: {
  title: string;
  rightNode?: ReactNode;
  transparent?: boolean;
  isModal?: boolean;
  onCloseModal?: () => void;
}) {
  const { back, asPath } = useRouter();
  const [mounted, setMounted] = useState(false);
  const isRoot = asPath === '/';
  const routeContext = useContext(RouteContext);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  const renderBack = () => {
    if (isModal) {
      return (
        <button
          className="absolute left-4"
          type="button"
          onClick={onCloseModal}
        >
          <MdClose />
        </button>
      );
    }
    if (mounted && !isRoot) {
      return (
        <button
          className="absolute left-4"
          type="button"
          onClick={() => back()}
        >
          <FaArrowLeft />
        </button>
      );
    }
  };

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 mx-auto flex h-[50px] w-full max-w-[600px] items-center justify-center px-4',
        transparent ? 'bg-transparent' : 'bg-gray-900 shadow-lg',
      )}
    >
      {renderBack()}
      <p>{title}</p>
      <div className="absolute right-4">{rightNode && rightNode}</div>
    </header>
  );
}

export default Header;
