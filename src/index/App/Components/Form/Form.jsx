import React, { useMemo } from "react";

import formData from "./data";
import { Input } from "./Input/Input";
import { useForm } from "./useForm";

export function Form() {
  const [formState, { actionSetForm }] = useForm(formData);
  const form = useMemo(() => {
    return Object.keys(formState)
      .reduce(
        (acc, inputKeyObj) =>
          acc.concat({
            id: inputKeyObj,
            config: formState[inputKeyObj],
          }),
        []
      )
      .map((formElement) => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valueType={formElement.id}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touch}
            changed={(event) => actionSetForm(formElement, event.target.value)}
          />
        );
      });
  }, [formState, actionSetForm]);

  return <div>{form}</div>;
}

