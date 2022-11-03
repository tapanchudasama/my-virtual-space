import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Script
        async
        data-website-id="ca8e6d6c-2f31-413b-b650-43f21855ee8b"
        src="https://analytics.tapan.app/umami.js"
      />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
