const HEADING = "about me";

const AboutMe = ({ html }: { html: string }) => {
  return (
    <div className="container mt-16">
      <p className="flex text-3xl xl:text-4xl py-6 flex space-x-2 leading-tight font-bold">
        {HEADING}
      </p>
      <div className="sm:prose-sm prose lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

export default AboutMe;
