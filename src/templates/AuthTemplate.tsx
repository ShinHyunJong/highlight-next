import type { ReactNode } from 'react';

function AuthTemplate({ children }: { children: ReactNode }) {
  return <section className="h-full max-w-[412px]">{children}</section>;
}

export default AuthTemplate;
