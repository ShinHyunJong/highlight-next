import clsx from 'clsx';
import type { ReactNode } from 'react';

import BottomNav from '@/components/bottomNav/BottomNav';
import Header from '@/components/header/Header';
import { layoutConfig } from '@/configs/layout.config';

function HeaderTemplate({
  children,
  title,
  transparent,
  rightNode,
  isModal,
  onCloseModal,
  hasFooter,
}: {
  title: string;
  children: ReactNode;
  rightNode?: ReactNode;
  transparent?: boolean;
  isModal?: boolean;
  onCloseModal?: () => void;
  hasFooter?: boolean;
}) {
  return (
    <section className="scrollbar-hide relative mx-auto w-full max-w-[600px]">
      <Header
        isModal={isModal}
        title={title}
        rightNode={rightNode}
        transparent={transparent}
        onCloseModal={onCloseModal}
      />
      <section
        style={{
          paddingBottom: hasFooter ? layoutConfig.footerHeight : 0,
        }}
        className={clsx('w-full', transparent ? 'pt-0' : 'pt-[50px]')}
      >
        {children}
      </section>
      {hasFooter && <BottomNav />}
    </section>
  );
}

HeaderTemplate.defaultProps = {
  hasFooter: true,
};

export default HeaderTemplate;
