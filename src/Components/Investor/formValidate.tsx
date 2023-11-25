import * as Yup from "yup";
// import { parsePhoneNumberFromString } from "libphonenumber-js";

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),

  investorMail: Yup.string()
    .email("Invalid email format")
    .required("Investor mail is required"),

  // phone: Yup.mixed().test("phone", "Invalid phone number", function (value) {
  //   if (!value) {
  //     return this.createError({ message: "Phone number is required" });
  //   }
  //   const stringValue = String(value);

  //   if (!/^\+?\d+$/.test(stringValue)) {
  //     return this.createError({ message: "Invalid phone number format" });
  //   }

  //   const phoneNumber = parsePhoneNumberFromString(stringValue, undefined);

  //   return phoneNumber
  //     ? phoneNumber.isValid()
  //     : this.createError({ message: "Phone must start with country code" });
  // }),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "strong-password",
      "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      (value) => {
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

        return (
          lowercaseRegex.test(value) &&
          uppercaseRegex.test(value) &&
          digitRegex.test(value) &&
          specialCharRegex.test(value)
        );
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .nullable()
    .required("Confirm password is required"),

  agreeToTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the Terms and Privacy Policy"
  ),
});

export const loginSchema = Yup.object().shape({
  investorMail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const passwordSchema = Yup.object().shape({
  investorMail: Yup.string()
    .email("Invalid email format")
    .required("Investor mail is required"),
});

export const resetSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "strong-password",
      "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      (value) => {
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

        return (
          lowercaseRegex.test(value) &&
          uppercaseRegex.test(value) &&
          digitRegex.test(value) &&
          specialCharRegex.test(value)
        );
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .nullable()
    .required("Confirm password is required"),
});
