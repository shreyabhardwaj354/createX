
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedInstructorRoute() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/me",{
        withCredentials: true,
        headers: {
          "Cache-Control" : "no-cache",
        }
    })
      .then((res) => {
        setAuthenticated(res.data.authenticated === true);
      })
      .catch((err) => {
        setAuthenticated(false)});
  }, []);

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#dce8d8] flex items-center justify-center text-[#214f46]">
        Checking your session...
      </div>
    );
  }

  return authenticated
    ? <Outlet />
    : <Navigate to="/admin/login" replace />;
}
