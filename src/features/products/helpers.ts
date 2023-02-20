import AppleLogo from "../../assets/apple-logo.png";
import HuaweiLogo from "../../assets/huawei-logo.png";
import MicrosoftLogo from "../../assets/microsoft-logo.png";
import SamsungLogo from "../../assets/samsung-logo.png";
import DefaultLogo from "../../assets/grey-default-logo.png";
import { ProductType } from "./productTypes";

export const getBrandImage = (imageBrand: string) => {
  switch (imageBrand) {
    case "Apple":
      return AppleLogo;
    case "Huawei":
      return HuaweiLogo;
    case "Microsoft Surface":
      return MicrosoftLogo;
    case "Samsung":
      return SamsungLogo;
    default:
      return DefaultLogo;
  }
};

export const getBuyNowOption = (product: ProductType) => {
  if (
    (product.brand === "Apple" ||
      product.brand === "Huawei" ||
      product.brand === "Microsoft Surface" ||
      product.brand === "Samsung") &&
    product.discountPercentage > 15 &&
    product.rating > 4.8
  ) {
    return true;
  }

  return false;
};
