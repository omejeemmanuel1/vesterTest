import * as Yup from "yup";

export const preferenceSchema = Yup.object().shape({
  africanCountry: Yup.array()
    .transform((originalValue) => {
      if (
        originalValue &&
        Array.isArray(originalValue) &&
        originalValue.length > 0
      ) {
        if (originalValue[0].value === "all") {
          return originalValue.map((option) => option.value);
        }
        return [originalValue[0].value];
      }
      return originalValue;
    })
    .required("Please select country"),
  sector: Yup.array()
    .transform((originalValue) => {
      if (
        originalValue &&
        Array.isArray(originalValue) &&
        originalValue.length > 0
      ) {
        if (originalValue[0].value === "all") {
          return originalValue.map((option) => option.value);
        }
        return [originalValue[0].value];
      }
      return originalValue;
    })
    .required("Sector is required"),
  technologyInterest: Yup.array()
    .transform((originalValue) => {
      if (
        originalValue &&
        Array.isArray(originalValue) &&
        originalValue.length > 0
      ) {
        if (originalValue[0].value === "all") {
          return originalValue.map((option) => option.value);
        }
        return [originalValue[0].value];
      }
      return originalValue;
    })
    .required("Technology is required"),
});
