import React, { useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useUserData } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
import styles from "./Add-rating.module.css";

function Addrating() {
  const { auth } = useAuth();
  const { userData } = useUserData();

  const [test, setTest] = useState("");
  const [interval, setInterval] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const { resultId } = useParams();

  const handleAddRating = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/rating`,
        {
          user: userData.id,
          healthCenter: resultId,
          test: test,
          interval: interval,
          comment: comment,
        },
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );
      console.log(response);
      console.log("resultID: ", resultId);
      console.log("User Id", useUserData);
      setSuccess("Recensione aggiunta con successo");
    } catch (error) {
      setError("Errore durante la registrazione: ", error);
      console.log("Errore durante la registrazione", error.response.data);
    }
  };

  useEffect(() => {
    const fetchClinicName = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rating/healtcenter/${resultId}`
        );
        console.log("Nome clinica", response.data.healthCenter.nome);
        setName(response.data.healthCenter.nome);
      } catch (error) {
        setErrorName("Errore: ", error);
      }
    };
    fetchClinicName();
  }, [resultId]);

  return (
    <div className={styles.addRatingContainer}>
      <h1 className="p-3">Clinica: {name ? name : errorName}</h1>
      <h3 className="p-3">Aggiungi recensione</h3>
      <Form onSubmit={handleAddRating}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Tipo di esame</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tipo di esame"
              value={test}
              onChange={(e) => setTest(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Tempo di attesa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tempo di attesa"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group md="6" className="mb-3 p-2">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              col={6}
              type="text"
              placeholder="Commento"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Inserisci</Button>
          </Col>

          <Col>
            <Button to="/dashboard">
              <NavLink
                className=" text-reset text-decoration-none"
                to="/dashboard"
              >
                Torna alla pagina precedente
              </NavLink>
            </Button>
          </Col>
        </Row>
        <Form.Group className="mb-3"></Form.Group>
      </Form>
      <div className="pt-5 pb-3">
        {success ? <p>{success} </p> : <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default Addrating;
