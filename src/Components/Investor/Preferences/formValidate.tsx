import * as Yup from "yup";

export const preferenceSchema = Yup.object().shape({
  africanCountry: Yup.mixed()
    .transform((originalValue) => {
      if (Array.isArray(originalValue) && originalValue.length > 0) {
        return originalValue[0].value;
      }
      return originalValue;
    })
    .required("Please select country"),
  sector: Yup.mixed()
    .transform((originalValue) => {
      if (Array.isArray(originalValue) && originalValue.length > 0) {
        return originalValue[0].value;
      }
      return originalValue;
    })
    .required("Sector is required"),
  technologyInterest: Yup.mixed()
    .transform((originalValue) => {
      if (Array.isArray(originalValue) && originalValue.length > 0) {
        return originalValue[0].value;
      }
      return originalValue;
    })
    .required("technology is required"),
});
