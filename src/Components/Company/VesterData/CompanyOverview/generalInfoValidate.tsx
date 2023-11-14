import * as Yup from "yup";

export const generalSchema = Yup.object().shape({
  registrationCountry: Yup.string().required(
    "Select the country your company is registered"
  ),
  industry: Yup.string().required("Please select industry"),
  mainTechnology: Yup.array()
    .of(Yup.string())
    .test(
      "at-least-one-mainTecnology",
      "Select at least one main technology",
      (value = []) => value.length > 0
    ),
  foundingDate: Yup.string().required("Please select starting date"),
  fundingStage: Yup.string().required("Please select funding stage"),
});

export const generalSchema2 = Yup.object().shape({
  industry: Yup.string().required("Please select your industry"),
  mainTechnology: Yup.array()
    .min(1, "Please select at least one main technology")
    .required("Please select your main technologies"),
  foundingDate: Yup.string().required("Please select your founding date"),
});