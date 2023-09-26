import React from "react";

import axios from "axios";
import { useState } from "react";
import { useAuth, useUserData } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GoAlert } from "react-icons/go";

function Login() {
  const { login } = useAuth();
  const { setUserData } = useUserData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [empityFields, setEmpityFields] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setEmpityFields(true);
      setErrorMessage("");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log("Accesso avvenuto con successo", response.data);
      const token = response.data.token;
      login(token);
      const userData = response.data;
      setUserData(userData);

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Errore durante l'accesso. Controlla le credenziali.");
      setEmpityFields("");
      console.log("Errore durante l'accesso", err);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="pt-5 pb-5 d-grid gap-2 col-6 mx-auto"
      >
        <div className="d-md-block">
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Inserire Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
    </>
  );
}

export default Login;
