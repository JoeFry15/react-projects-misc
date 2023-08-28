import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export function Layout() {
  return (
    <>
      <nav>
        <ul className="link-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reverser">Reverser</Link>
          </li>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
          <li>
            <Link to="/website-checker">Website Checker</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
