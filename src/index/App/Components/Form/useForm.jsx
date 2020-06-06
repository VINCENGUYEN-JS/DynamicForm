import { useReducer } from "react";
import pipe from "lodash/fp/pipe";
import set from "lodash/fp/set";

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
