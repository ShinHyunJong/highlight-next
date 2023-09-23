import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function Header({
  title,
  rightNode,
}: {
  title: string;
  rightNode?: ReactNode;
}) {
  const { back, asPath } = useRouter();
  const [mounted, setMounted] = useState(false);
  const isRoot = asPath === '/';
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return (
    <header className="fixed top-0 z-50 flex h-[50px] w-full items-center justify-center bg-gray-900 px-4 shadow-lg">
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
      <div>{rightNode && rightNode}</div>
    </header>
  );
}

export default Header;
