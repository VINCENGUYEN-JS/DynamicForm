import React from "react";
import classes from "./Input.css";

export function Input({
  key,
  elementType,
  elementConfig,
  value,
  valueType,
  invalid,
  shouldValidate,
  touched,
  changed,
}) {
  let validationError = null;
  let inputElement = null;
  if (invalid && touched) {
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid {valueType}!
      </p>
    );
  }

  switch (elementType) {
    case "input": {
      inputElement = (
        <input {...elementConfig} onChange={changed} value={value} />
      );
      break;
    }
    case "select": {
      inputElement = (
        <select onChange={changed}>
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    }
    default:
      inputElement = <input />;
  }

  return (
    <div className={classes.Input}>
      {inputElement}
      {validationError}
    </div>
  );
}
