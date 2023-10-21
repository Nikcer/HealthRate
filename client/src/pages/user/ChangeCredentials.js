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

const ChangeCredentials = (password) => {
  const { auth } = useAuth();
  const { userData } = useUserData();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords must match");
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/users/${userData.id}/password`,
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );
      navigate("/userprofile");
      console.log("Password update successfully!", response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error", error);
      setErrorMessage("Error");
    }
  };
  return (
    <div className="p-3">
      <h1>Update Password</h1>
      <p className="text-danger">
        Your password needs to have at least 8 characters with at least one
        uppercase letter, one lowercase letter, one number and one special
        character.
      </p>
      {auth.isAuthenticated ? (
        <Form onSubmit={handleChangePassword}>
          <Form.Group
            as={Row}
            className="flex-column p-3"
            controlId="formHorizontalEmail"
          >
            <Form.Label sm={1}></Form.Label>
            <Col>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="flex-column p-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label sm={2}></Form.Label>
            <Col>
              <Form.Control
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
              />
            </Col>
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      ) : (
        <p>You must log in to change your Password.</p>
      )}
    </div>
  );
};

export default ChangeCredentials;
