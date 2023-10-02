import React from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

import styles from "./Add-clinic.module.css";
import { useNavigate } from "react-router-dom";
function Addclinic() {
  const { auth } = useAuth();

  const [nome, setNome] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [citta, setCitta] = useState("");
  const [provincia, setProvincia] = useState("");
  const [regione, setRegione] = useState("");
  const [cap, setCap] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [sitoWeb, setSitoWeb] = useState("");
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");
  const [resultId, setResultId] = useState([]);
  const navigate = useNavigate();
  const handleAddClinic = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/healthcenter`,
        {
          nome: nome,
          indirizzo: indirizzo,
          citta: citta,
          provincia: provincia,
          regione: regione,
          cap: cap,
          telefono: telefono,
          email: email,
          sitoWeb: sitoWeb,
        },
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );

      console.log("Clinica aggiuntacon successo", response.data._id);
      setSucces("Clinica aggiunta con successo");
      setResultId(response.data._id);
    } catch (err) {
      setError("Errore durante la registrazione");
      console.log("Errore durante la registrazione", err.response.data);
    }
  };
  const handleAddReview = (resultId) => {
    navigate(`/addrating/${resultId}`);
  };
  return (
    <div className={styles.addClinicContainer}>
      <h3>Inserisci un nuovo centro sanitario</h3>
      <Form onSubmit={handleAddClinic}>
        <Row className="mb-2">
          <Form.Group as={Col} md="6" className="pb-4">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" className="pb-4">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              name="indirizzo"
              value={indirizzo}
              onChange={(e) => setIndirizzo(e.target.value)}
              type="text"
              placeholder="Indirizzo"
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6" className="pb-4">
            <Form.Label>Città</Form.Label>
            <Form.Control
              type="text"
              placeholder="Città"
              value={citta}
              onChange={(e) => setCitta(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" className="pb-4">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sigla, Es: MI"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6" className="pb-4">
            <Form.Label>Regione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Regione"
              value={regione}
              onChange={(e) => setRegione(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" className="pb-4">
            <Form.Label>Cap</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cap"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" className="pb-4">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" className="pb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" className="pb-4">
            <Form.Label>Sito web</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sito Web"
              value={sitoWeb}
              onChange={(e) => setSitoWeb(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3"></Form.Group>
        <div>
          <Button type="submit">Inserisci</Button>

          <Button>
            <NavLink
              className=" text-reset text-decoration-none"
              to="/dashboard"
            >
              Torna indietro
            </NavLink>
          </Button>
          <Button>
            <NavLink
              onClick={() => handleAddReview(resultId)}
              to={`/addrating/${resultId}`}
              className=" text-reset text-decoration-none"
            >
              Inserisci Recensione
            </NavLink>
          </Button>
          <div className="pt-5">
            {success ? (
              <p>{success} </p>
            ) : (
              <p className="text-danger">{error}</p>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Addclinic;
