import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authContext } from "../../helpers/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { logged, setLogged } = useContext(authContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      //continue script

      await axios
        .post("http://localhost:8000/api/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === 401) {
              toast.error("Information not reconize in our system", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }

            if (res.data.status === 200) {
              localStorage.setItem("userToken", res.data.token);

              setLogged(true);

              navigate("/profil");
            }
          }
        });
    } else {
      //display notification error

      toast.error("Please fill the form", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (localStorage.getItem("userToken")) {
      setLogged(true);
      console.log("You are connected");
      navigate("/profil");
    }
  };

  return (
    <div className="body">
      <ToastContainer />

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email {logged ? "true" : "false"}</label>
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
