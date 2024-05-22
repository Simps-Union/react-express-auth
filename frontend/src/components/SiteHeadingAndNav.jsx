import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return 
}
