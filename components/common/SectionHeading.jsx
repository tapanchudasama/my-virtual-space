import React from "react";

const SectionHeading = ({ children }) => {
  return (
    <h3 className="text-2xl md:text-3xl lg:text-4xl py-6 flex space-x-2 leading-tight font-bold">
      {children}
    </h3>
  );
};

export default SectionHeading;
