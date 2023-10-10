import clsx from 'clsx';
import type { ReactNode } from 'react';

import Header from '@/components/header/Header';

function HeaderTemplate({
  children,
  title,
  transparent,
  rightNode,
  isModal,
  onCloseModal,
}: {
  title: string;
  children: ReactNode;
  rightNode?: ReactNode;
  transparent?: boolean;
  isModal?: boolean;
  onCloseModal?: () => void;
}) {
  return (
    <section className="scrollbar-hide relative mx-auto h-full w-full max-w-[600px]">
      <Header
        isModal={isModal}
        title={title}
        rightNode={rightNode}
        transparent={transparent}
        onCloseModal={onCloseModal}
      />
      <section
        className={clsx(
          'scrollbar-hide h-full w-full',
          transparent ? 'pt-0' : 'pt-[50px]',
        )}
      >
        {children}
      </section>
    </section>
  );
}

export default HeaderTemplate;
