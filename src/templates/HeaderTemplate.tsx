import clsx from 'clsx';
import type { ReactNode } from 'react';

import Header from '@/components/header/Header';

function HeaderTemplate({
  children,
  title,
  transparent,
  rightNode,
}: {
  title: string;
  children: ReactNode;
  rightNode?: ReactNode;
  transparent?: boolean;
}) {
  return (
    <section className="relative mx-auto h-full w-full max-w-[600px] scrollbar-hide">
      <Header title={title} rightNode={rightNode} transparent={transparent} />
      <section
        className={clsx(
          'h-full w-full scrollbar-hide',
          transparent ? 'pt-0' : 'pt-[50px]',
        )}
      >
        {children}
      </section>
    </section>
  );
}

export default HeaderTemplate;
