import * as Yup from "yup";

export const teamscoreSchema = Yup.object().shape({
  foundingteam: Yup.string().required(
    "Please provide detailed founding team information"
  ),

  cofounderNames: Yup.array().of(
    Yup.string().required("Co-founder name is required")
  ),
  cofounderLinkedins: Yup.array().of(
    Yup.string()
      .url("Invalid URL format")
      .required("Co-founder linkedin is required")
      .matches(
        /^https:\/\/www.linkedin.com/,
        "Please provide a valid LinkedIn URL"
      )
  ),
  foundingteam_key_role: Yup.array().of(
    Yup.string().required("Co-founder role is required")
  ),

  technicalFounder: Yup.array().of(
    Yup.string().required("Technical founder selection is required")
  ),
  foundingteam_committment: Yup.array().of(
    Yup.string().required("Commitment selection is required")
  ),
  founderTime: Yup.array()
    .of(Yup.string().required("Please select"))
    .min(1, "Please select at least one option"),
});

export const teamscoreSchema2 = Yup.object().shape({
//   cLevelExec: Yup.string().required("This field is required"),

  cLevelLinkedin: Yup.string().required("This field is required"),
  clevelteam_key_role: Yup.string().required("This field is required"),

  clevel_committment: Yup.string().required("This field is required"),

  clevelteam: Yup.string()
    .required("Description of the executive role is required")
    .min(100, "Description should be at least 100 characters"),
});
