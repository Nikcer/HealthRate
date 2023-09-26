import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import styles from "./ClinicForm.module.css";

function DisplayClinic() {
  const { resultId } = useParams();
  const { auth } = useAuth();
  const [results, setResults] = useState();

  const [error, setError] = useState();
  console.log("Id ospedale:", resultId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/rating/healtcenter/${resultId}`
        );
        console.log("Response:", response.data);
        const data = await response.data;
        setResults(data);

        console.log("dati: ", data);
      } catch (error) {
        console.log(error);
        setError("Errore:", error);
      }
    };

    fetchRating();
    console.log("fetchRating :", fetchRating());
    console.log("Risultati:", results);
    // eslint-disable-next-line
  }, [resultId, auth.user]);

  useEffect(() => {
    console.log("Risultati:", results);
  }, [results]);
  const handleAddReview = (resultId) => {
    navigate(`/addrating/${resultId}`);
  };

  return (
    <section className={styles.clinicform}>
      {results ? (
        <Row>
          <div>
            <h1 className="p-2">
              Clinica:{" "}
              {results.healthCenter
                ? results.healthCenter.nome
                : "Caricamento..."}
            </h1>
            <Container fluid>
              <div className="container text-center border border-2 border-info rounded-2 ">
                <div className="row">
                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      Città:{" "}
                      {results.healthCenter
                        ? results.healthCenter.citta
                        : "Caricamento..."}
                    </h6>
                  </div>
                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      Provincia:{" "}
                      {results.healthCenter
                        ? results.healthCenter.provincia
                        : "Caricamento..."}
                    </h6>
                  </div>

                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      Regione:{" "}
                      {results.healthCenter
                        ? results.healthCenter.regione
                        : "Caricamento..."}
                    </h6>
                  </div>
                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      Indirizzo:{" "}
                      {results.healthCenter
                        ? results.healthCenter.indirizzo
                        : "Caricamento..."}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm p-4">
                    <h6>
                      Cap:{" "}
                      {results.healthCenter
                        ? results.healthCenter.cap
                        : "Caricamento..."}
                    </h6>
                  </div>
                  <h6 className="col-sm p-4">
                    Sito Web:{" "}
                    {results.healthCenter ? (
                      <a
                        href={results.healthCenter.sitoWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {results.healthCenter.sitoWeb}
                      </a>
                    ) : (
                      "Caricamento..."
                    )}
                  </h6>
                  <h6 className="col-sm p-4">
                    Telefono:{" "}
                    {results.healthCenter
                      ? results.healthCenter.telefono
                      : "Caricamento..."}
                  </h6>
                  <h6 className="col-sm p-4">
                    Email:{" "}
                    {results.healthCenter
                      ? results.healthCenter.email
                      : "Caricamento..."}
                  </h6>
                </div>
              </div>
            </Container>
          </div>
        </Row>
      ) : (
        "Caricamento..."
      )}
      <Row className=" d-flex p-3">
        <h3 className=" p-3">Valutazioni</h3>
        <div className={styles.cardContainer}>
          <div className="col pt-5 pb-2">
            {results && results.ratings
              ? results.ratings.map((rating) => (
                  <div
                    key={rating._id}
                    className=" mb-3 border border-2 border-warning rounded-2"
                  >
                    <Card>
                      <Card.Body>
                        <Card.Subtitle className="mb-4 text-muted">
                          Id Utente: {rating.user}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-4 text-muted">
                          Tempi di attesa: {rating.interval}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-4 text-muted">
                          Esame: {rating.test}
                        </Card.Subtitle>
                        <Card.Text className="mb-4 text-muted">
                          Commento: {rating.comment}
                        </Card.Text>
                        <Card.Subtitle className="mb-4 text-muted">
                          Inserito il: {rating.inputDate}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              : <p>Nessuna valutazione disponibile</p> || (
                  <p className="text-danger">Errore: {error}</p>
                )}
          </div>
        </div>
      </Row>
      {results ? (
        <Col className="flex column pb-4">
          <Button type="button" size="md" className="border">
            <NavLink
              className="nav-link"
              onClick={() => handleAddReview(results.healthCenter._id)}
              to={`/addrating/${results.healthCenter._id}`}
            >
              Aggiungi Recensione
            </NavLink>
          </Button>
        </Col>
      ) : (
        <p className="text-danger">Errore: {error}</p>
      )}
    </section>
  );
}

export default DisplayClinic;
