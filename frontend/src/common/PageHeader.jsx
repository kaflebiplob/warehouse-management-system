import React from "react";
import { colors, fontDisplay } from "../theme";

const PageHeader = ({ icon, title }) => (
  <div
    style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem 1.5rem" }}
  >
    <h1
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        fontFamily: fontDisplay,
        fontWeight: 600,
        fontSize: "1.6rem",
        color: colors.textHi,
        margin: 0,
      }}
    >
      <i
        className={`fe ${icon}`}
        style={{ color: colors.accent, fontSize: "1.3rem" }}
        aria-hidden="true"
      />
      {title}
    </h1>
  </div>
);

export default PageHeader;
