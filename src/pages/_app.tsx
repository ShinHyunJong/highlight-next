import '@/styles/global.css';
import 'react-activity/dist/library.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import type { AppProps as NextAppProps } from 'next/app';
import NextNProgress from 'next-progress';
import { DefaultSeo } from 'next-seo';
import { type ReactNode, useEffect } from 'react';

import { Toaster } from '@/components/ui/toaster';
import { AudioProvider } from '@/contexts/AudioContext';
import { RouteProvider } from '@/contexts/RouteContext';
import { useAuth } from '@/hooks/auth';
import { Meta } from '@/layouts/Meta';
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

const GetUser = () => {
  const { getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);
  return null;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Template = Component.Template || Empty;
  const props = Component.props || {};

  return (
    <QueryClientProvider client={queryClient}>
      <Meta />
      <DefaultSeo
        title="Discover Real Music"
        description="What your favorite cafes, brands, and friends actually listen to."
        canonical="https://discoverrealmusic.com/"
        openGraph={{
          type: 'website',
          locale: 'en',
          title: `Discover Real Music`,
          description:
            'What your favorite cafes, brands, and friends actually listen to.',
          url: 'https://discoverrealmusic.com/',
          images: [
            {
              url: 'https://assets.discoverrealmusic.com/public/ogImage.png',
            },
          ],
        }}
      />
      <Provider>
        <NextNProgress
          disableSameRoute
          color="#ffffff"
          options={{ showSpinner: false }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        />
        <RouteProvider>
          <Toaster />
          <GetUser />
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
