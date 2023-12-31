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
import { useAuth } from "../../../context/AuthProvider";
import styles from "./Dashboard.module.css";
import Loader from "../../../components/Loader/Loader";
function Dashboard() {
  const [query, setQuery] = useState({
    name: "",
    city: "",
    district: "",
    region: "",
  });
  const { logout } = useAuth();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (results.length < 1) {
      setIsLoading(false);
      setError("Not clinic found");
    }
    if (!query.name && !query.city && !query.district && !query.region) {
      setIsLoading(false);
      setError("Add search parameters");
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/healthcenter?name=${query.name}&city=${query.city}&district=${query.district}&region=${query.region}`
      );

      const data = await response.data;
      console.log(response);
      setResults(data);
      setIsLoading(false);
      console.log(results);
    } catch (error) {
      setError("Not clinics were found");
      setIsLoading(false);

      console.error("Error:", error);
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
      <Row className="p-4 gx-5">
        <Col md={3} className="pb-1">
          <div className="pb-5">
            <h1>Menù</h1>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/addclinic" className="nav-link">
                  Add New Clinic
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/Userprofile" className="nav-link">
                  Your Profile
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/yourratings" className="nav-link">
                  Your Ratings
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/changecredentials" className="nav-link">
                  Update Password
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border">
                <NavLink to="/updateuser" className="nav-link">
                  Update Email
                </NavLink>
              </Button>
            </Row>
            <Row md={1}>
              <Button size="md" className="border" onClick={handleLogout}>
                Logout
              </Button>
            </Row>
          </div>
        </Col>

        <Col md={8} className={styles.searchContainer}>
          <div className="border border-primary-subtle p-2 mb-2 rounded border-3">
            <h3 className="pt-4 ">Search clinic</h3>
            <Form onSubmit={handleSubmit} className="pb-5">
              <Row className="mb-3">
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={query.name}
                    onChange={handleChange}
                    placeholder="Search by Name"
                    readOnly={isLoading}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={query.city}
                    onChange={handleChange}
                    type="text"
                    placeholder="Search by City"
                    readOnly={isLoading}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by District"
                    name="district"
                    value={query.district}
                    onChange={handleChange}
                    readOnly={isLoading}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" className="pb-3">
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by Region"
                    name="region"
                    value={query.region}
                    onChange={handleChange}
                    readOnly={isLoading}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3"></Form.Group>
              <Button type="submit" disabled={isLoading}>
                Search
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      <div className={styles.resultsContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <Col className="b-0">
            {results.length > 0 && (
              <h3 className="text-success pt-3">RESULTS:</h3>
            )}
            <div>
              {results.length > 0 ? (
                results.map((result) => (
                  <div
                    key={result._id}
                    className="border border-danger-subtle  mb-2 rounded border-3"
                  >
                    <Card.Title>
                      {result.name} - {result.city} - {result.region}
                    </Card.Title>

                    <NavLink
                      className="p-2"
                      onClick={() => handleAddReview(result._id)}
                      to={`/addrating/${result._id}`}
                    >
                      Add Rating
                    </NavLink>

                    <NavLink
                      className="p-2"
                      onClick={() => handleAddReview(result._id)}
                      to={`/clinicform/${result._id}`}
                    >
                      View Ratings
                    </NavLink>
                  </div>
                ))
              ) : (
                <h3 className="text-danger pt-3">{error}</h3>
              )}
            </div>
          </Col>
        )}
      </div>
    </Container>
  );
}

export default Dashboard;
