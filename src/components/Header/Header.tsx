import { Link } from "react-router-dom";
import style from "./Header.module.scss";

export function Header() {
  return (
    <div className={style.container}>
      <Link to="/">Workspace</Link> |<Link to="/about">About</Link> |
      <Link to="/login">Login</Link> |
    </div>
  );
}
