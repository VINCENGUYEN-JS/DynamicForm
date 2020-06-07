import { useReducer } from "react";
import pipe from "lodash/fp/pipe";
import set from "lodash/fp/set";

type ElementConfig =
  | {
      type: string,
      placeholder: string,
    }
  | {
      options: { value: string, displayValue: string }[],
    };

interface OrderForm {
  [name: string]: {
    elementType: string,
    elementConfig: ElementConfig,
    value: string,
    validation: {
      required?: boolean,
    },
    valid: boolean,
    touch?: boolean,
  };
}

interface Form {
  orderForm: OrderForm;
  formIsValid: boolean;
}

function checkValid(value, rules) {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  return isValid;
}
const handleReducer = (state, action) => {
  const { fieldName, value, validation } = action.payload;
  if (action.type === "UPDATE_FORM") {
    return pipe(
      set(`orderForm.${fieldName}.value`, value),
      set(`orderForm.${fieldName}.valid`, checkValid(value, validation)),
      set(`orderForm.${fieldName}.touch`, true)
    )(state);
  }
  return state;
};

const actionSetForm = (dispatch) => (formElement, value) =>
  dispatch({
    type: "UPDATE_FORM",
    payload: {
      fieldName: formElement.id,
      value: value,
      validation: formElement.config.validation,
    },
  });

export function useForm(initialState) {
  const [formState, dispatch] = useReducer(handleReducer, initialState);

  return [
    formState.orderForm,
    {
      actionSetForm: actionSetForm(dispatch),
    },
  ];
}

/**
 * not using lodash fp
 */

// const handleReducer = (state, action) => {
//   const { id, value, validation } = action.payload;
// if (action.type === "UPDATE_FORM") {
//   return {
//     ...state,
//     orderForm: {
//       ...state.orderForm,
//       [id]: {
//         ...state.orderForm[id],
//         value,
//         valid: checkValid(value, validation),
//         touch: true,
//       },
//     },
//   };
// }
//   return state;
// };
