import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={s.navcover}>
      <nav className={s.navigation}>
        <ul className={s.navlist}>
          <li className={s.navitem}>
            <NavLink exact="true" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
