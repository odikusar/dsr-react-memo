// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

export const AuthOnly = () => {
  const outlet = useOutlet();

  const navigate = useNavigate();
  // const user = { a: 1 };
  const user = null;
  // const user = useSelector((store) => store.authSlice.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // }, [user]);
  }, []);

  return user && outlet;
};