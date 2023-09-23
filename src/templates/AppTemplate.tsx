import type { ReactNode } from 'react';

import BottomNav from '@/components/bottomNav/BottomNav';
import { layoutConfig } from '@/configs/layout.config';

function AppTemplate({ children }: { children: ReactNode }) {
  return (
    <section
      className="relative mx-auto h-full max-w-[600px]"
      style={{ paddingBottom: layoutConfig.footerHeight }}
    >
      {children}
      <BottomNav />
    </section>
  );
}

export default AppTemplate;
