import validator from "validator";

class validators {
  is_valid_email = (email: string): boolean => {
    return validator.isEmail(email);
  };
}

export default validators;
