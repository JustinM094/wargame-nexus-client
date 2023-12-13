import { Navigate, Outlet } from "react-router-dom";

export const Authorized = () => {
  if (localStorage.getItem("rare_token")) {
    return (
      <>
        <main className="flex items-center justify-center">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
