import '@/styles/global.css';
import 'react-activity/dist/library.css';

import { Provider } from 'jotai';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { type ReactNode } from 'react';

import { AudioProvider } from '@/contexts/AudioContext';
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <NextNProgress color="#ffffff" options={{ showSpinner: false }} />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      />
      <AudioProvider>
        <Template {...props}>
          <Component {...pageProps} />
        </Template>
      </AudioProvider>
    </Provider>
  );
};

export default MyApp;
