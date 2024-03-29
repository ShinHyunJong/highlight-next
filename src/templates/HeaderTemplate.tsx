import clsx from 'clsx';
import type { ReactNode } from 'react';

import BottomNav from '@/components/bottomNav/BottomNav';
import Header from '@/components/header/Header';
import { layoutConfig } from '@/configs/layout.config';
import { useAudio } from '@/hooks/audio';

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
  const { playingAudio } = useAudio();

  const calcaulatePaddingBottom = () => {
    if (hasFooter && playingAudio) {
      return layoutConfig.footerHeight + layoutConfig.bottomPlayerHeight;
    }
    if (hasFooter && !playingAudio) {
      return layoutConfig.footerHeight;
    }
    return 0;
  };

  return (
    <section className="scrollbar-hide relative mx-auto w-full max-w-[412px]">
      <Header
        isModal={isModal}
        title={title}
        rightNode={rightNode}
        transparent={transparent}
        onCloseModal={onCloseModal}
      />
      <section
        style={{
          paddingBottom: calcaulatePaddingBottom(),
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
