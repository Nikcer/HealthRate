import React from "react";
import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import axios from "axios";
import { useUserData } from "../../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import styles from "./UpdateUser.module.css";

function UpdateUser() {
  const { auth } = useAuth();
  const { userData } = useUserData();

  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const navigate = useNavigate();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (newEmail !== confirmNewEmail) {
      setError("Emails must match");
      return;
    }

    try {
      setIsLoading(true);
      setIsFormDisabled(true);
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
      console.log("Email successfully updated", response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error", err);
      setIsLoading(false);
      setError("Error");
    }
  };

  return (
    <div className={styles.updateUserContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>UPDATE EMAIL</h2>
          {auth.isAuthenticated ? (
            <Form onSubmit={handleUpdateUser}>
              <Form.Group
                as={Row}
                className="mb-1 p-4"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}></Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="New Email"
                    required
                    readOnly={isFormDisabled}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-1 p-4"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={2}></Form.Label>
                <Col sm={8} className="p-2">
                  <Form.Control
                    type="email"
                    value={confirmNewEmail}
                    onChange={(e) => setConfirmNewEmail(e.target.value)}
                    placeholder="Confirm Email"
                    required
                    readOnly={isFormDisabled}
                  />
                </Col>
              </Form.Group>

              {error && <h3 className="text-danger">{error}</h3>}

              <Button variant="primary" type="submit" className="mb-3">
                Update
              </Button>
            </Form>
          ) : (
            <h3 className="text-danger">
              You must log in to change your Email.
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

export default UpdateUser;
