import AppRoutes from "./pages";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import { logOut } from "./redux/reducer";

function App() {
  const { user, isAuth } = useAppSelector((state) => state.slice.authState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.status == "Blocked") {
      dispatch(logOut());
      window.location.reload();
      alert("Oh, you were banned(");
    }
  }, [user]);
  return (
    <div className="container">
      <AppRoutes />
    </div>
  );
}

export default App;
