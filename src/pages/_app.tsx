import '@/styles/global.css';
import 'react-activity/dist/library.css';

import { Provider, useSetAtom } from 'jotai';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { type ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import authAtom from '@/atoms/auth';
import { AudioProvider } from '@/contexts/AudioContext';
import { RouteProvider } from '@/contexts/RouteContext';
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
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Template = Component.Template || Empty;
  const props = Component.props || {};
  const setSelectedPickSong = useSetAtom(authAtom.selectedPickSong);
  useEffect(() => {
    setSelectedPickSong([]);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
        <RouteProvider>
          <AudioProvider>
            <Template {...props}>
              <Component {...pageProps} />
            </Template>
          </AudioProvider>
        </RouteProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
