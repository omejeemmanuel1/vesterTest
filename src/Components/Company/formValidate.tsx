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

export const adminLoginSchema = Yup.object().shape({
  adminMail: Yup.string()
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

export const teamscoreSchema = Yup.object().shape({
  founding_team_info: Yup.string().required(
    "Please provide detailed founding team information"
  ),
});

export const marketscoreSchema = Yup.object().shape({
  problemSolved: Yup.string().required("Enter the problem you are solving"),
  problemCost: Yup.string().required("Enter the cost of the problem solved"),
});

export const businessSchema = Yup.object().shape({
  productStage: Yup.string().required("Enter your product stage"),
  businessModels: Yup.array()
    .of(Yup.string())
    .test(
      "at-least-one-model",
      "Select at least one business model",
      (value = []) => value.length > 0
    ),
});

export const financialSchema = Yup.object().shape({
  customerAcquisition: Yup.string().required(
    "Enter your monthly gross month  1, 2, 3"
  ),
  startupRevenue: Yup.string().required("Enter your startup runway"),
  currentBurnRatet: Yup.string().required("Enter your current burn rate"),
});

export const generalSchema = Yup.object().shape({
  companyOverview: Yup.string().required("Please fill the company overview"),
  registrationRegion: Yup.string().required(
    "Select the region your company is registered"
  ),
  registrationCountry: Yup.string().required(
    "Select the country your company is registered"
  ),
});

export const generalSchema2 = Yup.object().shape({
  industry: Yup.string().required("Please select your industry"),
  mainTechnology: Yup.string().required("Please select your main technology"),
  foundingDate: Yup.string().required("Please select your founding date"),
  companyExplanation: Yup.string().required("This field is required"),
});

export const teamscoreSchema2 = Yup.object().shape({
  founderGender: Yup.string().required("Please select an option"),
  technicalFounder: Yup.string().required("Please select an option"),
  founderTime: Yup.string().required("Please select an option"),
  cLevel: Yup.string().required("Please select an option"),
});
