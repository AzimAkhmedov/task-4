import { NavLink } from "react-router-dom";
import s from "./index.module.scss";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { register, setError } from "../../redux/reducer";

const Registration = () => {
  const dispatch = useAppDispatch();
  const { error, message } = useAppSelector((state) => state.slice.authState);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit(val) {
      dispatch(register(val));
    },
  });
  if (error) {
    alert(message);
    dispatch(setError())
  }
  return (
    <div className={s.root}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Create Account </h1>
        <input
          className={s.input}
          placeholder="Type your username"
          type="text"
          onChange={formik.handleChange}
          id="username"
        />
        <input
          className={s.input}
          placeholder="Type your email"
          type="email"
          onChange={formik.handleChange}
          id="email"
        />

        <input
          className={s.input}
          placeholder="Create your password"
          type="password"
          onChange={formik.handleChange}
          id="password"
        />

        <button type="submit">Sign Up</button>

        <NavLink to={"/"}>If you have account Login </NavLink>
      </form>
    </div>
  );
};

export default Registration;
