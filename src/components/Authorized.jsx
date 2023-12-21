import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { NavBar } from "./Navbar.jsx";

export const Authorized = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (localStorage.getItem("rare_token")) {
    return (
      <>
        <NavBar id={id} navigate={navigate} />
        <main className="flex items-center justify-center">
          <Outlet />
        </main>
      </>
    );
  }

  return <Navigate to="/login" replace />;
};
