import { connect } from "react-redux";
import { DirectCar } from "../ui/DirectCar";
import { setDirty } from "../../../modules";
import getParties from "../../../mockData/entries-parts";
import { ITrades } from "../../../types";

const mapDispatchToProps = {
  updateData: (car: ITrades) => {
    return setDirty(car);
  }
};

const mapStateToProps = () => {
  return {
    items: getParties
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectCar);
