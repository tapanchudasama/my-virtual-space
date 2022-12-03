import Image from "next/image";
import Script from "next/script";
import { Fragment, useEffect } from "react";

const CurrentlyReading = () => {
  return (
    <Fragment>
      <Image
        alt="image of book i am currently reading"
        src="https://m.media-amazon.com/images/I/91EplUQBYFS.jpg"
        width="300"
        height="450"
      />
    </Fragment>
  );
};

export default CurrentlyReading;
