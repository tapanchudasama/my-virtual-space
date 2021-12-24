import { AnimatePresence } from "framer-motion";
import React from "react";
import "./styles/global.css";

export const wrapPageElement = ({ element }) => {
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>;
};
