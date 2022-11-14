import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
} from "../../context/authActions";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_START });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          id="username"
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          id="password"
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error ? <span>{error.message}</span> : null}
      </div>
    </div>
  );
};

export default Login;
