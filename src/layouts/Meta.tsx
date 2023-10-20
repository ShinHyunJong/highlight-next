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
      <link rel="icon" href={`${router.basePath}/favicon.ico`} key="favicon" />
    </Head>
  );
};

export { Meta };
