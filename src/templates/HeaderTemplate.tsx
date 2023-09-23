import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function HeaderTemplate({
  children,
  title,
  rightNode,
}: {
  title: string;
  children: ReactNode;
  rightNode?: ReactNode;
}) {
  const { back } = useRouter();
  return (
    <section className="relative mx-auto h-full max-w-[600px]">
      <header className="absolute top-0 z-50 flex h-[50px] w-full items-center justify-between px-4 shadow-lg">
        <button type="button" onClick={() => back()}>
          <FaArrowLeft />
        </button>
        <p>{title}</p>
        <div>{rightNode && rightNode}</div>
      </header>
      <section className="h-full w-full pt-[50px]">{children}</section>
    </section>
  );
}

export default HeaderTemplate;
