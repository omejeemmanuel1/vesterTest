import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  companyWebsite: Yup.string()
    .url("Invalid URL format")
    .required("Company website is required"),
  companyMail: Yup.string()
    .email("Invalid email format")
    .required("Company mail is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "strong-password",
      "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      (value) => {
        // Define regex patterns for each requirement
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

        // Check if all requirements are met
        return (
          lowercaseRegex.test(value) &&
          uppercaseRegex.test(value) &&
          digitRegex.test(value) &&
          specialCharRegex.test(value)
        );
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ''], "Passwords must match")
    .nullable() // Allow null value in confirmPassword
    .required("Confirm password is required"),

  companySector: Yup.string().required("Company sector is required"),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the Terms and Privacy Policy"
  ),
});

export const loginSchema = Yup.object().shape({
  companyMail: Yup.string()
    .email("Invalid email format")
    .required("Company mail is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const passwordSchema = Yup.object().shape({
  companyMail: Yup.string()
    .email("Invalid email format")
    .required("Company mail is required"),
});

export const resetSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "strong-password",
      "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      (value) => {
        // Define regex patterns for each requirement
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

        // Check if all requirements are met
        return (
          lowercaseRegex.test(value) &&
          uppercaseRegex.test(value) &&
          digitRegex.test(value) &&
          specialCharRegex.test(value)
        );
      }
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ''], "Passwords must match")
    .nullable() // Allow null value in confirmPassword
    .required("Confirm password is required"),
});
