import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { GoAlert } from "react-icons/go";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [empityFields, setEmpityFields] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(true);
      setEmpityFields("");
      return;
    }

    if (username === "" || email === "" || password === "") {
      setEmpityFields(true);
      setErrorMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log("Registrazione avvenuta con successo", response);

      navigate("/login");
    } catch (err) {
      console.log("Errore durante la registrazione", err.response.data);
      if (err.response.data.error.includes("duplicate key error")) {
        setEmpityFields("");
        setErrorMessage("Username già esistente");
        return;
      } else if (err.response.data.error.includes("Email")) {
        setEmpityFields("");
        setErrorMessage("Email già esistente");
        return;
      }
    }
  };

  return (
    <>
      <div className="p-3">
        <h1>Registrazione</h1>
        <p className="text-danger">
          La password deve contenere 8 caratteri con almeno una lettera
          maiuscola, una lettera minuscola, un numero e un carattere speciale.
        </p>
      </div>
      <Form
        className="d-flex flex-column p-3 gap-2 col-9 mx-auto"
        onSubmit={handleSubmit}
      >
        <Row className="mb-3">
          <Form.Group as={Row} className="p-3" controlId="formGroupUsername">
            <Form.Label sm={1}>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Inserire Username"
            />
          </Form.Group>
          <Form.Group as={Row} className="p-3">
            <Form.Label sm={1}>Indirizzo Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Inserire Email"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Row} className="p-3">
            <Form.Label sm={1}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 p-3"
            controlId="formGroupConfirmPassword"
          >
            <Form.Label sm={1}>Conferma Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Conferma Password"
            />
          </Form.Group>
        </Row>
        {empityFields && (
          <div>
            <GoAlert />
            <p class="text-md-center">Tutti i campi sono obligatori</p>
          </div>
        )}
        {errorMessage && (
          <div>
            <GoAlert />
            <h5>{errorMessage}</h5>
          </div>
        )}
        <Button type="submit">Registrati</Button>{" "}
      </Form>
    </>
  );
}

export default Signup;
