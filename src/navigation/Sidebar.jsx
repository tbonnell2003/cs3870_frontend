import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const BASE = "/cs3870_frontend";

  return (
    <aside
      className="p-3 border rounded-4"
      style={{ minWidth: 260, background: "#f8fbff" }}
    >
      <h4 className="mb-3">Navigation</h4>
      <nav className="nav flex-column gap-2">

        <NavLink
          end
          to={`${BASE}/`}
          className="nav-link border rounded-3 px-3 py-2"
        >
          Home
        </NavLink>

        <NavLink
          to={`${BASE}/contacts`}
          className="nav-link border rounded-3 px-3 py-2"
        >
          View Contacts
        </NavLink>

        <NavLink
          to={`${BASE}/add`}
          className="nav-link border rounded-3 px-3 py-2"
        >
          Add Contact
        </NavLink>

        <NavLink
          to={`${BASE}/delete`}
          className="nav-link border rounded-3 px-3 py-2"
        >
          Delete Contact
        </NavLink>

        <NavLink
          to={`${BASE}/update`}
          className="nav-link border rounded-3 px-3 py-2"
        >
          Update Contact
        </NavLink>

      </nav>
    </aside>
  );
}
