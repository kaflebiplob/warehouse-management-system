import React, { useState } from "react";
import { colors } from "../theme";

const InputElement = (props) => {
  const [value, setValue] = useState(props.value || "");
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={props.type || "text"}
      value={value}
      required={props.required !== undefined ? props.required : true}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      onChange={(e) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: colors.surfaceRaised,
        border: `1px solid ${focused ? colors.accent : colors.border}`,
        borderRadius: 6,
        color: colors.textHi,
        padding: "0.6rem 0.75rem",
        fontSize: "0.9rem",
        outline: "none",
        transition: "border-color 0.15s ease",
      }}
    />
  );
};

export default InputElement;
