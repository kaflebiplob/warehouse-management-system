import React from "react";
import { colors } from "../theme";

export const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: colors.surfaceRaised,
  border: `1px solid ${colors.border}`,
  borderRadius: 6,
  color: colors.textHi,
  padding: "0.65rem 0.8rem",
  fontSize: "0.9rem",
  outline: "none",
};

const FormField = ({ label, htmlFor, children }) => (
  <div style={{ marginBottom: "1.1rem" }}>
    <label
      style={{
        display: "block",
        fontSize: "0.78rem",
        color: colors.textLo,
        marginBottom: "0.4rem",
      }}
      htmlFor={htmlFor}
    >
      {label}
    </label>
    {children}
  </div>
);

export default FormField;
