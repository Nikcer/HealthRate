import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [query, setQuery] = useState({
    nome: "",
    citta: "",
    provincia: "",
    regione: "",
  });
  const { logout } = useAuth();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (results.length < 1) {
      setError("Nessuna clinica trovata secondo i parametri inseriti");
    }
    if (!query.nome && !query.citta && !query.provincia && !query.regione) {
      setError("Inserire parametri di ricerca");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/healthcenter?nome=${query.nome}&citta=${query.citta}&provincia=${query.provincia}&regione=${query.regione}`
      );

      const data = await response.data;
      console.log(response);

      setResults(data);
      console.log(results);
    } catch (error) {
      setError("Nessuna clinica trovata secondo i parametri inseriti");

      console.error("Errore nella ricerca:", error);
    }
  };
  const handleAddReview = (resultId) => {
    navigate(`/addrating/${resultId}`);
  };

  const handleLogout = () => {
    logout();
    console.log(logout);

    navigate("/login");
  };

  return (
    <Container className={styles.dashboardContainer}>
      <Row className="p-4">
        <Col md={3} className="pb-1">
          <div className="pb-5">
            <h1>Menù</h1>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/addclinic" className="nav-link">
                  Inserisci Nuova Clinica
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/Userprofile" className="nav-link">
                  Il tuo profilo
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/yourratings" className="nav-link">
                  Le tue recensioni
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/changecredentials" className="nav-link">
                  Aggiorna Password
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/updateuser" className="nav-link">
                  Aggiorna Email
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border" onClick={handleLogout}>
                Esci
              </Button>
            </Row>
          </div>
        </Col>

        <Col md={9} className={styles.searchContainer}>
          <div>
            <h3 className="pt-4 ">Cerca clinica</h3>
            <Form onSubmit={handleSubmit} className="pb-5">
              <Row className="mb-3">
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={query.nome}
                    onChange={handleChange}
                    placeholder="Cerca per nome"
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>Città</Form.Label>
                  <Form.Control
                    name="citta"
                    value={query.citta}
                    onChange={handleChange}
                    type="text"
                    placeholder="Cerca per città"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cerca per città"
                    name="provincia"
                    value={query.provincia}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>Regione</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cerca per città"
                    name="regione"
                    value={query.regione}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3"></Form.Group>
              <Button type="submit">Cerca</Button>
            </Form>
          </div>
        </Col>
      </Row>

      <div className={styles.resultsContainer}>
        <Col className="b-0">
          {results.length > 0 && <h2>Risultati:</h2>}
          <div>
            {results.length > 0 ? (
              results.map((result) => (
                <div
                  key={result._id}
                  className="border border-danger-subtle  mb-2 rounded border-3"
                >
                  <Card.Title>
                    {result.nome} - {result.citta} - {result.regione}
                  </Card.Title>

                  <NavLink
                    className="p-2"
                    onClick={() => handleAddReview(result._id)}
                    to={`/addrating/${result._id}`}
                  >
                    Aggiungi Recensione
                  </NavLink>

                  <NavLink
                    className="p-2"
                    onClick={() => handleAddReview(result._id)}
                    to={`/clinicform/${result._id}`}
                  >
                    Visualizza Recensioni
                  </NavLink>
                </div>
              ))
            ) : (
              <p>{error}</p>
            )}
          </div>
        </Col>
      </div>
    </Container>
  );
}

export default Dashboard;
