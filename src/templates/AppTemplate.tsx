import type { ReactNode } from 'react';

function AppTemplate({ children }: { children: ReactNode }) {
  return (
    <section className="relative mx-auto h-full max-w-[412px]">
      {children}
    </section>
  );
}

export default AppTemplate;
