import React, { useState, useContext } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../Context/userContext";
import { API, setAuthToken } from "../../../Config/api";
import StyleSignin from "./Signin.module.css";
import StyleSignup from "./Signin.module.css";

function ModalLogin(props) {
  let history = useHistory();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      console.log(response);

        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });
        
        setAuthToken(response.data.data.user.token);

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal {...props} centered size="sm">
      <Modal.Body>
          <div>
            <p className={StyleSignin.title}>Sign In</p>
            <form className={StyleSignin.signinForm}  onSubmit={handleSubmit}>
            {message && message}
              <div className="form-group">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={StyleSignin.inputField}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  className={StyleSignin.inputField}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input type="submit"  value="Sign in" className={StyleSignin.Signinbutton}>
                </input>
              </div>
            </form>
            <p className="text-center">
               Don't have an account? Click
              <span className="fw-bold p-e" style={{cursor:"pointer"}} onClick={props.onRedirectRegis}>
                &nbsp;Here
              </span>
            </p>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

function ModalRegister(props) {
   //useContext
   const [state] = useContext(UserContext);
   console.log(state);

  //handle register
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const { fullName, email, password } = form;

  const handleChangeRegister = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

       // Insert data user to database
      const response = await API.post("/register", body, config);

       // Notification
       if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
          password: "",
          role: "Customer",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
          Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
  return (
    <div>
      <Modal {...props} centered size="sm">
      <Modal.Body>
          <div>
            <p className={StyleSignup.title}>Sign Up</p>
           
            <form className={StyleSignup.signupForm}  onSubmit={handleSubmitRegister}>
            {message && message}
              <div className="form-group">
                <input
                  id="email"
                  value={email}
                  name="email"
                  onChange={handleChangeRegister}
                  className={StyleSignup.inputField}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  value={password}
                  name="password"
                  onChange={handleChangeRegister}
                  type="password"
                  className={StyleSignup.inputField}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                   id="fullName"
                  value={fullName}
                  name="fullName"
                  onChange={handleChangeRegister}
                  className={StyleSignup.inputField}
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="form-group">
                <button className={StyleSignup.signUpButton} >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center">
              Already have an account? Click
              <span className="fw-bold p-e" style={{cursor:"pointer"}} onClick={props.onRedirectLogin}>
                &nbsp;Here
              </span>
            </p>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}


export default function BtnGroup() {
  const [modalReg, setModalReg] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

  const RedirectToLogin = () => {
    setModalReg(false);
    setModalLogin(true);
  };

  const RedirectToRegis = () => {
    setModalReg(true);
    setModalLogin(false);
  };

  return (
    <div className="btn-group">
      <button
        style={{ width: "150px", height: "50px", background: "#D60000", marginRight:"20px", border:"none"  }}
        onClick={() => setModalReg(true)}>
        <h5 style={{ color:"white", marginTop:"5px"}}>Sign up</h5>
      </button>
      <ModalRegister
        show={modalReg}
        onHide={() => setModalReg(false)}
        onRedirectLogin={RedirectToLogin}
      />
      <button
        style={{ width: "150px", height: "50px", background: "#CDCDCDB2", border:"none" }}
        onClick={() => setModalLogin(true)}>
        <h5 style={{ marginTop:"5px"}}>Sign In</h5>
      </button>
      <ModalLogin
        show={modalLogin}
        onHide={() => setModalLogin(false)}
        onRedirectRegis={RedirectToRegis}
      />
    </div>
  );
}