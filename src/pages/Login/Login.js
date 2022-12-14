import React from "react";
import loginVideo from "../../image/login.mp4";
import classes from "./Login.module.css";
import logo from "../../image/ist.png";
import LoginPart from "./LoginPart";
const Login = () => {
  return (
    <div className={`${classes.login}`}>
      <div
        className={`m-auto d-flex justify-content-center p-0 ${classes.loginTop}`}
      >
        <div className={`${classes.logo}`}>
          <img src={logo} alt="" />
        </div>
        <div className={`mt-2 ms-5 ${classes.logoText}`}>
          <h1>Library Management System</h1>
          <p>2022</p>
        </div>
      </div>
      <div className='container-fluid'>
        <div className="row">
          <div className={`img offset-md-1 col-md-4 ${classes.video}`}>
            <video
              loop={true}
              autoPlay={true}
              autoplayTimeout={10000}
              autoplayHoverPause={true}
              muted={true}
            >
              <source src={loginVideo} type="video/mp4" />
            </video>
          </div>
          <div className={`offset-md-2 col-md-5 me-5 ${classes.loginPart}`}>
            <LoginPart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
