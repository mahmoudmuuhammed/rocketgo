import { body } from "express-validator";

const signupValidator = [
  body(["email", "password", "fullName"])
    .notEmpty()
    .withMessage("All fields is required")
    .isString()
    .withMessage("All fields must be in a valid format *String*"),
  body("email").isEmail().withMessage("Email must be in a valid signature"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 6,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters and have an Uppercase and symbols"
    ),
];

const loginValidator = [
  body(["email", "password"])
    .notEmpty()
    .withMessage("All fields is required")
    .isString()
    .withMessage("All fields must be in a valid format *String*"),
  body("email").isEmail().withMessage("Email must be in a valid signature"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

export default { signupValidator, loginValidator };
