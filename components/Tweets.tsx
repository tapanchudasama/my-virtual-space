import Script from "next/script";
import React, { Fragment, useEffect, useState } from "react";

const Tweets = () => {
  return (
    <Fragment>
      <a
        className="twitter-timeline"
        data-width="350"
        data-height="450"
        data-theme="dark"
        href="https://twitter.com/tapanchudasama7?ref_src=twsrc%5Etfw"
      >
        Tweets by tapanchudasama7
      </a>{" "}
      <Script
        defer
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </Fragment>
  );
};

export default Tweets;
