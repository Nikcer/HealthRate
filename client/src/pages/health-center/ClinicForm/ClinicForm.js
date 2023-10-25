import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import styles from "./ClinicForm.module.css";
import Loader from "../../../components/Loader/Loader";
function DisplayClinic() {
  const { resultId } = useParams();
  const { auth } = useAuth();
  const [results, setResults] = useState();

  const [error, setError] = useState();
  console.log("Id clinic:", resultId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rating/healtcenter/${resultId}`
        );
        console.log("Response:", response.data);
        const data = await response.data;

        setResults(data);

        console.log("data: ", data);
      } catch (error) {
        console.log(error);
        setError("Error:", error);
      }
    };

    fetchRating();
    console.log("fetchRating :", fetchRating());
    console.log("Risults:", results);
    // eslint-disable-next-line
  }, [resultId, auth.user]);

  useEffect(() => {
    console.log("Results:", results);
  }, [results]);
  const handleAddReview = (resultId) => {
    navigate(`/addrating/${resultId}`);
  };

  return (
    <section className={styles.clinicform}>
      {results ? (
        <Row>
          <div>
            <h1 className="p-5">
              CLINIC:{" "}
              {results.healthCenter ? results.healthCenter.name : <Loader />}
            </h1>
            <Container fluid>
              <div className="container text-center border border-2 border-info rounded-2 ">
                <div className="row">
                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      City:{" "}
                      {results.healthCenter ? (
                        results.healthCenter.city
                      ) : (
                        <Loader />
                      )}
                    </h6>
                  </div>
                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      District:{" "}
                      {results.healthCenter ? (
                        results.healthCenter.district
                      ) : (
                        <Loader />
                      )}
                    </h6>
                  </div>

                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      Region:{" "}
                      {results.healthCenter ? (
                        results.healthCenter.region
                      ) : (
                        <Loader />
                      )}
                    </h6>
                  </div>
                  <div className="col-sm p-4" user_name="Test 1">
                    <h6>
                      Address:{" "}
                      {results.healthCenter ? (
                        results.healthCenter.address
                      ) : (
                        <Loader />
                      )}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm p-4">
                    <h6>
                      Zip code:{" "}
                      {results.healthCenter ? (
                        results.healthCenter.zip_code
                      ) : (
                        <Loader />
                      )}
                    </h6>
                  </div>
                  <h6 className="col-sm p-4">
                    Web Site:{" "}
                    {results.healthCenter ? (
                      <a
                        href={results.healthCenter.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {results.healthCenter.website}
                      </a>
                    ) : (
                      <Loader />
                    )}
                  </h6>
                  <h6 className="col-sm p-4">
                    Phone number:{" "}
                    {results.healthCenter ? (
                      results.healthCenter.phone_number
                    ) : (
                      <Loader />
                    )}
                  </h6>
                  <h6 className="col-sm p-4">
                    Email:{" "}
                    {results.healthCenter ? (
                      results.healthCenter.email
                    ) : (
                      <Loader />
                    )}
                  </h6>
                </div>
              </div>
            </Container>
          </div>
        </Row>
      ) : (
        <Loader />
      )}
      <Row className=" d-flex p-3">
        <h3 className=" p-5">Ratings</h3>
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
                          User Id: {rating.user}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-4 text-muted">
                          Waiting Time: {rating.interval}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-4 text-muted">
                          Clinical test: {rating.test}
                        </Card.Subtitle>
                        <Card.Text className="mb-4 text-muted">
                          Comment: {rating.comment}
                        </Card.Text>
                        <Card.Subtitle className="mb-4 text-muted">
                          Date: {rating.inputDate}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              : <h3 className="text-danger">Not results were found</h3> || (
                  <h3 className="text-danger">Error: {error}</h3>
                )}
          </div>
        </div>
      </Row>
      {results ? (
        <Col className="flex column pb-4">
          <Button type="button" size="md" className="p-2 m-2">
            <NavLink
              className="nav-link"
              onClick={() => handleAddReview(results.healthCenter._id)}
              to={`/addrating/${results.healthCenter._id}`}
            >
              Add Rating
            </NavLink>
          </Button>
          <Button to="/dashboard" className="p-2 m-2">
            <NavLink
              className="text-reset text-decoration-none"
              to="/dashboard"
            >
              Back
            </NavLink>
          </Button>
        </Col>
      ) : results ? (
        <h3 className="text-danger">No results were found</h3>
      ) : (
        <h3 className="text-danger">Error: {error}</h3>
      )}
    </section>
  );
}

export default DisplayClinic;
