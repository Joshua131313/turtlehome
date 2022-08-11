import React from "react";

export const AuthInput = (props) => {
  const { value, setValue, type = "text", placeholder, error, disabled } = props;
  return (
    <div className="flex authinputcont">
      <span>{placeholder}</span>
      <input
        disabled={disabled}
        required
        type={type}
        value={value}
        placeholder={`Enter ${placeholder}`}
        className="authinput"
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <span className="error">
        {error}
      </span>}
    </div>
  );
};
