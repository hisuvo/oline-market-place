import { useContext } from "react";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold">SoloSphere</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/jobs">All Jobs</NavLink>
          </li>

          {!user && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/add-job" className="justify-between">
                  Add Job
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-posted-jobs">My Posted Jobs</NavLink>
              </li>
              <li>
                <NavLink to="/my-bids">My Bids</NavLink>
              </li>
              <li>
                <NavLink to="/bid-requests">Bid Requests</NavLink>
              </li>
              <li className="mt-2">
                <NavLink>
                  <button onClick={logOut} className="block text-center">
                    Logout
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
