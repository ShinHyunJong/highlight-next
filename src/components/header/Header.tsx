import clsx from 'clsx';
import { useRouter } from 'next/router';
import { type ReactNode, useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { RouteContext } from '@/contexts/RouteContext';

function Header({
  title,
  rightNode,
  transparent,
}: {
  title: string;
  rightNode?: ReactNode;
  transparent?: boolean;
}) {
  const { back, asPath } = useRouter();
  const [mounted, setMounted] = useState(false);
  const isRoot = asPath === '/';
  const routeContext = useContext(RouteContext);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 mx-auto flex h-[50px] w-full max-w-[600px] items-center justify-center px-4',
        transparent ? 'bg-transparent' : 'bg-gray-900 shadow-lg',
      )}
    >
      {mounted && !isRoot && (
        <button
          className="absolute left-4"
          type="button"
          onClick={() => back()}
        >
          <FaArrowLeft />
        </button>
      )}
      <p>{title}</p>
      <div className="absolute right-4">{rightNode && rightNode}</div>
    </header>
  );
}

export default Header;
