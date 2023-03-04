import { Data, ValidationConfig } from "./validator.props";

export function validator(data: Data, config: ValidationConfig) {
  const errors: { [key: string]: string } = {};

  function validate(
    validateMethod: string,
    data: string,
    config: { message: string; value?: number }
  ) {
    let statusValidate: boolean = false;

    switch (validateMethod) {
      case "isRequired":
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else if (typeof data !== "object") {
          statusValidate = data.trim() === "";
        }
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }
      case "min": {
        statusValidate = data.length < config.value!;
        break;
      }
      case "max": {
        statusValidate = data.length > config.value!;
        break;
      }
      default:
        break;
    }

    if (statusValidate) {
      return config.message;
    }
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}
