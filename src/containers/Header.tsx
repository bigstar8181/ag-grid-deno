import { connect } from "react-redux";
import { Header } from "../components";
import { setNewDate, save, reload } from "../modules";

const mapDispatchToProps = {
  setNewDate: (date: string) => {
    return setNewDate(date);
  },
  save: () => {
    return save();
  },
  load: () => {
    return reload();
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
