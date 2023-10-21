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
import styles from "./UpdateUser.module.css";
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
      setErrorMessage("Email must match");
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
      console.log("Email successfully updated", response.data);
      setErrorMessage("");
    } catch (err) {
      console.error("Error", err);
      setErrorMessage("Error");
    }
  };

  return (
    <div className={styles.updateUserContainer}>
      <h2>Update Email</h2>
      {auth.isAuthenticated ? (
        <Form onSubmit={handleUpdateUser}>
          <Form.Group
            as={Row}
            className="mb-1 p-4"
            controlId="formHorizontalEmail"
          >
            <Form.Label column sm={2}></Form.Label>
            <Col sm={4}>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="New Email"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-1 p-4"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}></Form.Label>
            <Col sm={4} className="p-2">
              <Form.Control
                type="email"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
                placeholder="Confirm  Email"
                required
              />
            </Col>
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Button variant="primary" type="submit" className="mb-3">
            Update
          </Button>
        </Form>
      ) : (
        <p>You must log in to change your Email.</p>
      )}
    </div>
  );
}

export default UpdateUser;
