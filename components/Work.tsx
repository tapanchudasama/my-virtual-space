const HEADING = "work";

const Work = ({ html }: { html: string }) => {
  return (
    <div>
      <p className="index-heading">{HEADING}</p>
      <div className="prose lg:prose-lg">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

export default Work;
