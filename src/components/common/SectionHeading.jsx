import React from "react";

const SectionHeading = ({ children }) => {
  return (
    <p className="text-2xl md:text-3xl lg:text-4xl py-6 flex space-x-2 font-medium leading-tight font-bold">
      {children}
    </p>
  );
};

export default SectionHeading;
