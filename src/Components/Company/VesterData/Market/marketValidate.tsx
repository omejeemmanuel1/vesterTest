
import * as Yup from "yup";

export const marketscoreSchema = Yup.object().shape({
  total_adressable_market: Yup.string().required(
    "Select total addressable market"
  ),
  servicable_adressable_market: Yup.string().required(
    "Select serviceable addressable market"
  ),
  servicable_obtainable_market: Yup.string().required(
    "Select serviceable obtainable market"
  ),
});