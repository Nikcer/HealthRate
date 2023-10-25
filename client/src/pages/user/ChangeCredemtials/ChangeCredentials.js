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

const ChangeCredentials = (password) => {
  const { auth } = useAuth();
  const { userData } = useUserData();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords must match");
      return;
    }

    try {
      setIsLoading(true);
      setIsFormDisabled(true);

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
      console.log("Password updated successfully", response.data);
      setSucces("Password updated successfully");
    } catch (err) {
      console.error("Error", error);
      setError("Error: ", err);
    }
  };
  return (
    <div className="p-3">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>Update Password</h1>
          <p className="text-danger">
            Your password needs to have at least 8 characters with at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </p>
          {auth.isAuthenticated ? (
            <Form onSubmit={handleChangePassword} disabled={isFormDisabled}>
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

              {success ? (
                <h3 className="text-success">{success}</h3>
              ) : (
                <h3 className="text-danger">{error}</h3>
              )}

              <Button variant="primary" type="submit" disabled={isLoading}>
                Update
              </Button>
            </Form>
          ) : (
            <h3 className="text-danger">
              You must log in to change your Password.
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangeCredentials;
