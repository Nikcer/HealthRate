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

function UpdateUser(user) {
  const { auth } = useAuth();
  const { userData } = useUserData();

  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (newEmail !== confirmNewEmail) {
      setErrorMessage("L'Email non corrispondono");
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/users/${userData.id}`,
        {
          email: newEmail,
        },
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );
      console.log("Response: ", response);
      console.log("UserData email", userData.email);

      navigate("/userprofile");
      console.log("Utente aggiornato correttamente", response.data);
      setErrorMessage("");
    } catch (err) {
      console.error("Errore", err);
      setErrorMessage("Errore durante l'aggiornamento del profilo");
    }
  };

  return (
    <div className="p-3">
      <h2>Aggiorna Email</h2>
      {auth.isAuthenticated ? (
        <Form onSubmit={handleUpdateUser}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Nuova Email
            </Form.Label>
            <Col sm={10} className="p-2">
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Nuova Email"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Conferma Nuova Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
                placeholder="Conferma Email"
                required
              />
            </Col>
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Button variant="primary" type="submit">
            Aggiorna
          </Button>
        </Form>
      ) : (
        <p>
          Devi effettuare il login per modificare la password il profilo utente.
        </p>
      )}
    </div>
  );
}

export default UpdateUser;
