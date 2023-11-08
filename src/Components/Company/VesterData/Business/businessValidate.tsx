import * as Yup from "yup";

export const businessSchema = Yup.object().shape({
  productStage: Yup.string().required("Enter your product stage"),
  monetization: Yup.string().required("Product stage is required"),
  businessModels: Yup.array()
    .of(Yup.string())
    .test(
      "at-least-one-model",
      "Select at least one business model",
      (value = []) => value.length > 0
    ),

});

export const businessSchema2 = Yup.object().shape({
  numberUsersGrowth: Yup.string().required("This field is required"),
  percentagePaidUsers: Yup.string().required("This field is required"),
  location_served: Yup.string().required("This field is required"),
});


