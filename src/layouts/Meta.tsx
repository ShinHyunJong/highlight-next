import Head from 'next/head';

const Meta = () => {
  return (
    <Head>
      <meta charSet="UTF-8" key="charset" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
      />
      <link rel="apple-touch-icon" href="apple-touch-icon.png" key="apple" />
      <link rel="icon" href="favicon.ico" key="favicon" />
    </Head>
  );
};

export { Meta };
