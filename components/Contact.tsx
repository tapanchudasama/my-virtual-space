import Link from "next/link";

const HEADING = "contact";

const SocialMedia: { [key: string]: { label: string; value: string } } = {
  twitter: {
    label: "@ironicallytapan",
    value: "https://twitter.com/ironicallytapan",
  },
  github: {
    label: "tapanchudasama",
    value: "https://github.com/tapanchudasama",
  },
  reddit: {
    label: "inflame07",
    value: "https://www.reddit.com/user/inflame07",
  },
  mail: {
    label: "tapan9740@gmail.com",
    value: "tapan9740@gmail.com",
  },
  linkedin: {
    label: "tapanchudasama",
    value: "https://www.linkedin.com/in/tapanchudasama",
  },
};

const toTitleCase = (str: string) => {
  let s = str.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
};

const Contact = () => {
  return (
    <div>
      <p className="index-heading">{HEADING}</p>
      <div className="space-y-4 mt-6">
        {Object.keys(SocialMedia).map((k: string) => (
          <div
            key={k}
            className="text-md lg:text-lg flex items-center space-x-4 font-sans"
          >
            <p className="w-32">{toTitleCase(k)}:</p>
            <Link target="_blank" href={SocialMedia[k].value}>
              <p className="border-b font-semibold">{SocialMedia[k].label}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
