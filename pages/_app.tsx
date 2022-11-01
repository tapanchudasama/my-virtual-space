import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Script
        async
        defer
        data-website-id="149ca713-471b-4c7c-b3c8-e6db918b49dc"
        src="http://localhost:3000/umami.js"
      />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
