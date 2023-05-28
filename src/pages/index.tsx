import { Navigate, Route, Routes } from "react-router-dom";
import Users from "./Users";
import Login from "./Login";
import Registration from "./Registration";
import { useAppSelector } from "../hooks";

const AppRoutes = () => {
  const isAuth = useAppSelector((state) => state.slice.authState.isAuth);
  
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/" element={<Users />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
