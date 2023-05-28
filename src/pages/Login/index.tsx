import { NavLink } from "react-router-dom";
import s from "./index.module.scss";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, setError } from "../../redux/reducer";
const Login = () => {
  const dispatch = useAppDispatch();
  const { error, message } = useAppSelector((state) => state.slice.authState);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit(val) {
      dispatch(login(val));
    },
  });
  if (error) {
    alert(message);
    dispatch(setError());
  }
  return (
    <div className={s.root}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Hi there, submit your credentials</h1>
        <input
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Type your username"
          id="username"
          type="text"
        />
        <input
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Enter your password"
          type="password"
          id="password"
        />

        <button type="submit">Login</button>
        <NavLink to={"/registration"}>Have no account yet? </NavLink>
      </form>
    </div>
  );
};

export default Login;
