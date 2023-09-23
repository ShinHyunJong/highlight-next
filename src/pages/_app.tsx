import '@/styles/global.css';

import { Provider } from 'jotai';
import type { AppProps as NextAppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { type ReactNode } from 'react';

import { ThemeProvider } from '@/providers/ThemeProvider';

type AppProps<P = any> = {
  Component: P;
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;
const Empty = ({ children }: { children: ReactNode }) => children;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    MusicKit: Record<string, any>;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Template = Component.Template || Empty;
  const props = Component.props || {};
  return (
    <Provider>
      <NextNProgress color="#ffffff" options={{ showSpinner: false }} />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      />
      <Template {...props}>
        <Component {...pageProps} />
      </Template>
    </Provider>
  );
};

export default MyApp;
