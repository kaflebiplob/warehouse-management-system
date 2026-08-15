import React from "react";
import { colors, fontBody } from "../theme";

const PageWrapper = ({ children }) => (
  <div
    style={{ background: colors.bg, minHeight: "100vh", fontFamily: fontBody }}
  >
    {children}
  </div>
);

export default PageWrapper;
