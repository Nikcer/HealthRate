import React, { useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { useUserData } from "../../../context/AuthProvider";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
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
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const { resultId } = useParams();

  const handleAddRating = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setIsFormDisabled(true);

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
      setSuccess("Rating added successfully");
      setShowForm(false);
    } catch (error) {
      setError("Error: ", error);
      console.log("Error", error.response.data);
    }
  };

  useEffect(() => {
    const fetchClinicName = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rating/healtcenter/${resultId}`
        );
        console.log("response.data", response.data.healthCenter._id);

        setName(response.data.healthCenter.name);
      } catch (error) {
        setErrorName("Error: ", error);
      }
    };
    fetchClinicName();
  }, [resultId]);

  const continueAddRating = () => {
    setShowForm(true);
    setTest(() => "");
    setInterval(() => "");
    setComment(() => "");
  };

  return (
    <div className={styles.addRatingContainer}>
      {showForm ? (
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <h1 className="p-3">Clinic: {name ? name : errorName}</h1>
              <h3 className="p-3">Add rating</h3>
              <Form onSubmit={handleAddRating}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6 mt-3">
                    <Form.Control
                      type="text"
                      placeholder="Clinical Test"
                      value={test}
                      onChange={(e) => setTest(e.target.value)}
                      required
                      readOnly={isFormDisabled}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6 mt-3">
                    <Form.Control
                      type="text"
                      placeholder="Waiting Time"
                      value={interval}
                      onChange={(e) => setInterval(e.target.value)}
                      required
                      readOnly={isFormDisabled}
                    />
                  </Form.Group>
                  <Form.Group md="6" className="mb-2 mt-2 p-2">
                    <Form.Control
                      as="textarea"
                      rows={6}
                      col={6}
                      type="text"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      readOnly={isFormDisabled}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" className="mb-2">
                      Add
                    </Button>
                  </Col>
                  <Col>
                    <Button to="/dashboard" className="mb-2">
                      <NavLink
                        className="text-reset text-decoration-none "
                        to="/dashboard"
                      >
                        Back
                      </NavLink>
                    </Button>
                  </Col>
                </Row>
                <Form.Group className="mb-3"></Form.Group>
              </Form>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-5 pb-3">
          {success ? (
            <h3 className="text-success">{success} </h3>
          ) : (
            <h3 className="text-danger">{error}</h3>
          )}
          <Row className="pt-1">
            <Col>
              <Button className="p-2 mb-2" onClick={continueAddRating}>
                Add New Rating
              </Button>
            </Col>
            <Col>
              <Button to="/dashboard" className="p-2 mb-2">
                <NavLink
                  className="text-reset text-decoration-none"
                  to="/dashboard"
                >
                  Back
                </NavLink>
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Addrating;
