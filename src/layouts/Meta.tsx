import Head from 'next/head';
import { useRouter } from 'next/router';

const Meta = () => {
  const router = useRouter();

  return (
    <Head>
      <meta charSet="UTF-8" key="charset" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
      />
      <link
        rel="apple-touch-icon"
        href={`${router.basePath}/apple-touch-icon.png`}
        key="apple"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${router.basePath}/favicon-32x32.png`}
        key="icon32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${router.basePath}/favicon-16x16.png`}
        key="icon16"
      />
      <link rel="icon" href={`${router.basePath}/favicon.ico`} key="favicon" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export { Meta };
