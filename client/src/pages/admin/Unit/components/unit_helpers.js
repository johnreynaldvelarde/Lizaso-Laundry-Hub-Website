import Available from "../../../../assets/images/Available.png";
import Occupied from "../../../../assets/images/Occupied.png";
import Reserved from "../../../../assets/images/Reserved.png";
import In_Maintaince from "../../../../assets/images/Not_Available.png";

export const getUnitImage = (status) => {
  switch (status) {
    case 0:
      return Available;
    case 1:
      return Occupied;
    case 2:
      return Reserved;
    case 3:
      return In_Maintaince;
    default:
      return Available;
  }
};
