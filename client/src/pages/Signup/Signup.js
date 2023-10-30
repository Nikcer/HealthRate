import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { GoAlert } from "react-icons/go";
import Loader from "../../components/Loader/Loader";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [empityFields, setEmpityFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setEmpityFields(false);
      return;
    }

    if (username === "" || email === "" || password === "") {
      setEmpityFields(true);
      setErrorMessage("");
      return;
    }

    try {
      setIsLoading(true);
      setIsFormDisabled(true);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/signup`,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log("Registrazione avvenuta con successo", response);

      navigate("/login");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "Unknown error";
      console.log("Error", error.response.data);
      if (errorMessage.includes("duplicate key error")) {
        setEmpityFields("");
        setErrorMessage("Username or email already exists");
        return;
      } else if (errorMessage.includes("Email")) {
        setEmpityFields("");
        setErrorMessage("Email already exists");
        return;
      } else {
        setErrorMessage("Error: " + errorMessage);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-3">
          <h1>JOIN OUR COMMUNITY</h1>
          <p className="text-danger">
            Your password needs to have at least 8 characters with at least one
            uppercase letter, one lowercase letter, one number and one special
            character.
          </p>
          <Form
            className="d-flex flex-column p-3 gap-2 col-4 mx-auto"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group
                as={Row}
                className="p-3"
                controlId="formGroupUsername"
              >
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  readOnly={isFormDisabled}
                />
              </Form.Group>
              <Form.Group as={Row} className="p-3">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  readOnly={isFormDisabled}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly={isFormDisabled}
                />
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3 p-3"
                controlId="formGroupConfirmPassword"
              >
                <Form.Label sm={1}></Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  readOnly={isFormDisabled}
                />
              </Form.Group>
            </Row>
            {empityFields && (
              <div>
                <GoAlert />
                <h5 className="text-md-center text-danger">
                  The fields are required
                </h5>
              </div>
            )}
            {errorMessage && (
              <div>
                <GoAlert />
                <h5 className="text-danger">{errorMessage}</h5>
              </div>
            )}
            <Button type="submit" disabled={isLoading}>
              Join us
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}

export default Signup;
