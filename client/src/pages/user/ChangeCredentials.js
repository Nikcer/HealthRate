import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { useUserData } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

const ChangeCredentials = (password) => {
  const { auth } = useAuth();
  const { userData } = useUserData();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Le password non corrispondono");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/users/${userData.id}/password`,
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );
      navigate("/userprofile");
      console.log("Password cambiata con successo", response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Errore durante il cambio della password", error);
      setErrorMessage("Errore durante il cambio della password");
    }
  };
  return (
    <div className="p-3">
      <h1>Cambia Password</h1>
      <p className="text-danger">
        La password deve contenere 8 caratteri con almeno una lettera maiuscola,
        una lettera minuscola, un numero e un carattere speciale.
      </p>
      {auth.isAuthenticated ? (
        <Form onSubmit={handleChangePassword}>
          <Form.Group
            as={Row}
            className="flex-column p-3"
            controlId="formHorizontalEmail"
          >
            <Form.Label sm={1}>Nuova Password</Form.Label>
            <Col>
              <Form.Control
                type="password"
                placeholder="Nuova Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="flex-column p-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label sm={2}>Conferma NuovaPassword</Form.Label>
            <Col>
              <Form.Control
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Conferma Password"
                required
              />
            </Col>
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Button variant="primary" type="submit">
            Cambia Password
          </Button>
        </Form>
      ) : (
        <p>
          Devi effettuare il login per modificare la password il profilo utente.
        </p>
      )}
    </div>
  );
};

export default ChangeCredentials;
