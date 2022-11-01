import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../helpers/authContext";

import "./Profil.css";
export default function Profil() {
  const { logged, setLogged } = useContext(authContext);
  const { user, setUser } = useContext(authContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
    userInfo();
  }, []);

  const checkLogin = () => {
    if (!localStorage.getItem("userToken")) {
      setLogged(false);
      console.log("You are not connected");
      navigate("/login");
    }
  };

  const userInfo = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    console.log("You are logout");
    navigate("/login");
  };

  const renderView = loading ? (
    <div>loading....</div>
  ) : (
    <div className="container">
      <div className="flex_container">
        <div className="left">
          <div className="card">
            <div className="img-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLiYsLafPbjDNaKtzCJf4JiTiGHL8i_32suFM0d9f&s"
                alt="img"
              />
            </div>
            <div className="name">{user.name} </div>
            <div className="email"> {user.email}</div>

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="right">
          <div className="card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            perferendis ducimus dicta suscipit fugit omnis praesentium id
            quibusdam. Illum impedit nobis quia nam qui ipsam ducimus harum!
            Excepturi, impedit sunt.
          </div>
        </div>
      </div>
    </div>
  );

  return <>{renderView}</>;
}
