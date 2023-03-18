import { ValidationConfig } from "./validator.props";

export const registerValidator: ValidationConfig = {
  email: {
    isRequired: { message: "Email is Required For Registration " },
    isEmail: { message: "Invalid Email " },
  },
  name: {
    isRequired: { message: "Name is Required For Registration " },
    min: {
      message: "account name must contain  at least 5 symbols",
      value: 5,
    },
  },
  password: {
    isRequired: { message: "Password is Required For Registration " },
    isCapitalSymbol: {
      message: "Password Must Have One Capital Symbol",
    },

    isContainDigit: {
      message: "Password Must At Least One Digit",
    },
    min: {
      message: "Password Must Contain At Least 8 Symbols",
      value: 8,
    },
  },
  terms: {
    isRequired: { message: "Must Accept Terms And Conditions To Use This App" },
  },
};
export const editValidator: ValidationConfig = {
  email: {
    isRequired: { message: "Email is Required  " },
    isEmail: { message: "Invalid Email " },
  },
  name: {
    isRequired: { message: "Name is Required" },
    min: {
      message: "account name must contain  at least 5 symbols",
      value: 5,
    },
  },
};
