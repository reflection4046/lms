import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "./SignUp.css";
import signUpVideo from "../../image/signup.mp4";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../image/ist.png";
import { UserContext } from "../../App";

const SignUp = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(loggedInUser);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const {
    register,
    handleSubmit,
    // formState: {  },
  } = useForm();
  const [newUser, setNewUser] = useState({
    isSignup: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  const onSubmit = (data) => {
    //console.log(data);
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    //console.log(password, confirmPassword);
    if (password === confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          // var user = userCredential.user;
          //console.log(user);

          let newUserInfo = { ...newUser };
          newUserInfo = {
            isSignup: true,
            name: "",
            email: email,
            photo: "",
            // error: error,
            success: true,
          };
          setNewUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);

          const updateUsername = firebase.auth().currentUser;
          //console.log(updateUsername.displayName);
          updateUsername
            .updateProfile({
              displayName: data.name,
              photoURL:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6At_WsdMZrn_ImShsz-Wm3yjXRdjZ905U8gLF_XJ3MJMbaEE9BIk_Q-2ALVvEOJXcfY&usqp=CAU",
            })
            .then((res) => {
              //console.log('res', res);
            })
            .catch((error) => {
              //console.log("error",error);
            });
        })
        .catch((error) => {
          // var error = error.message;
          const newUserInfo = { ...newUser };
          newUserInfo.error = error;
          newUserInfo.success = false;
          setNewUser(newUserInfo);
          alert(newUser.error);
          //console.log(error);
        });
    } else {
      alert("Password doesn't match");
    }
  };
  return (
    <div>
      <div className="container-fluid full-signup ">
        <div className="m-auto d-flex justify-content-center">
          <div className="signupLogo">
            <img src={logo} alt="" />
          </div>
          <div className="mt-4 ms-5 logoText">
            <h1>Library Management System</h1>
            <p>2022</p>
          </div>
        </div>
        <div className="row">
          <div className="signUpVideo offset-md-1 col-md-5 align-self-center">
            <video
              loop={true}
              autoPlay={true}
              autoplayTimeout={10000}
              autoplayHoverPause={true}
              muted={true}
            >
              <source src={signUpVideo} type="video/mp4" />
            </video>
          </div>
          <div className="col-md-auto">
            <div className="signup signup-box text-center">
              <div className="signupForm mt-5">
                <h1 className="pt-4">Sign Up</h1>
                <form
                  className="text-center p-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-3 form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      {...register("name", { required: true, maxLength: 20 })}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      {...register("email", { required: true, maxLength: 20 })}
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      {...register("password", {
                        required: true,
                        maxLength: 20,
                      })}
                      placeholder="Password"
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      {...register("confirmPassword", { maxLength: 20 })}
                      placeholder="Confirm Password"
                    />
                  </div>
                  <br />
                  <button
                    className="signupBtn btn"
                    type="submit"
                    value="Submit"
                  >
                    Submit
                  </button>
                </form>
                <div className="pb-3">
                  <p className="para-2 ms-auto mt-3">
                    Already have an account? <Link to="/login">Login Here</Link>
                  </p>
                </div>
                {/* <div  className="pb-3 signupSocial" > 
               <SocialAuth style={{ color: "red" }} setLoggedInUser={setLoggedInUser} user={newUser} setUser={setNewUser}></SocialAuth>
               </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
