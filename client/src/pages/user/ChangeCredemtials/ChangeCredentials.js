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

const ChangeCredentials = () => {
  const { auth } = useAuth();
  const { userData } = useUserData();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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

      console.log("Password updated successfully", response.data);
      setIsLoading(false);
      navigate("/userprofile");
    } catch (err) {
      console.error("Error", err);
      setError("Error");
      setIsLoading(false);
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
            <Form onSubmit={handleChangePassword}>
              <Form.Group
                as={Row}
                className="flex-column p-3"
                controlId="formHorizontalEmail"
                readOnly={isFormDisabled}
              >
                <Form.Label sm={1}></Form.Label>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    readOnly={isFormDisabled}
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
                    readOnly={isFormDisabled}
                  />
                </Col>
              </Form.Group>

              {error && <h3 className="text-danger">{error}</h3>}
              <Button variant="primary" type="submit">
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
