import type { ReactNode } from 'react';

import Header from '@/components/header/Header';

function HeaderTemplate({
  children,
  title,
  rightNode,
}: {
  title: string;
  children: ReactNode;
  rightNode?: ReactNode;
}) {
  return (
    <section className="relative mx-auto h-full w-full max-w-[600px]">
      <Header title={title} rightNode={rightNode} />
      <section className="h-full w-full pt-[50px]">{children}</section>
    </section>
  );
}

export default HeaderTemplate;
