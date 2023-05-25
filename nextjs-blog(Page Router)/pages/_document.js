import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script src='https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.at' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}