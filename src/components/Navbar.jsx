import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../../authutils";

export const NavBar = () => {
  const user_id = getCurrentUserId();
  const navigate = useNavigate();

  return (
    <nav className="bg-black p-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink
            to={"/"}
            className="text-white font-bold text-xl hover:text-gray-300"
          >
            <div className="navbar-logo">
              <img
                src="navbarLogo/Navbar Logo.png"
                alt="DishHub Logo"
                className="w-10 h-10"
              />
            </div>
          </NavLink>
          <NavLink to={"/allevents"} className="text-white hover:text-gray-300">
            Events
          </NavLink>
          <NavLink
            to={"/gamesevents"}
            className="text-white hover:text-gray-300"
          >
            Your Games and Events
          </NavLink>
          <NavLink to={"/armies"} className="text-white hover:text-gray-300">
            Your Armies
          </NavLink>
          <NavLink
            to={`/profile/${user_id}`}
            className="text-white hover:text-gray-300"
          >
            Your Profile
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          {localStorage.getItem("rare_token") !== null ? (
            <button
              className="text-white hover:text-gray-300"
              onClick={() => {
                localStorage.removeItem("rare_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to={"/login"} className="text-white hover:text-gray-300">
                Login
              </NavLink>
              <NavLink
                to={"/register"}
                className="text-white hover:text-gray-300"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
