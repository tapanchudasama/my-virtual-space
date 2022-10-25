const HEADING = "status quo";

const StatusQuo = ({ html }: { html: string }) => {
  return (
    <div className="container">
      <p className="flex text-3xl xl:text-4xl py-6 flex space-x-2 leading-tight font-bold">
        {HEADING}
      </p>
      <div className="text-md lg:text-lg prose">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

export default StatusQuo;
