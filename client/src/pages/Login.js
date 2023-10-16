import React from "react";

import axios from "axios";
import { useState } from "react";
import { useAuth, useUserData } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GoAlert } from "react-icons/go";
import Loader from "../components/Loader/Loader";
function Login() {
  const { login } = useAuth();
  const { setUserData } = useUserData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [empityFields, setEmpityFields] = useState("");
  const navigate = useNavigate();
  /*   const jwt = require("jsonwebtoken"); */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setEmpityFields(true);
      setErrorMessage("");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log("Accesso avvenuto con successo", response.data);
      const token = response.data.token;
      /* const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken); */
      login(token);
      const userData = response.data;
      setUserData(userData);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Errore durante l'accesso. Controlla le credenziali.");
      setEmpityFields("");
      setIsLoading(false);
      console.log("Errore durante l'accesso", err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Form
          onSubmit={handleSubmit}
          className="pt-5 pb-5 d-grid gap-2 col-6 mx-auto"
        >
          <div className="d-md-block">
            <Form.Group className="mb-3">
              <Form.Label>Indirizzo Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserire Email"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Accedi
          </Button>
          <div className="container-lg">
            {empityFields && (
              <div>
                <GoAlert />
                <br />
                <h5>Tutti i campi sono obligatori</h5>
              </div>
            )}
            {errorMessage && (
              <div>
                <GoAlert />
                <br />
                <h5>{errorMessage}</h5>
              </div>
            )}
          </div>
        </Form>
      )}
    </>
  );
}

export default Login;
