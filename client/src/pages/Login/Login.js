import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth, useUserData } from "../../context/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GoAlert } from "react-icons/go";
import Loader from "../../components/Loader/Loader";
function Login() {
  const { login } = useAuth();
  const { setUserData } = useUserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [empityFields, setEmpityFields] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setEmpityFields(true);
      setError("");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          email: email,
          password: password,
        }
      );
      console.log("Login successful", response.data);
      const token = response.data.token;
      login(token);
      const userData = response.data;
      setUserData(userData);

      navigate("/dashboard");
    } catch (err) {
      setError("Error: Check the fields.");
      setEmpityFields("");
      setIsLoading("false");
      console.log("Error:", err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Form
          onSubmit={handleSubmit}
          className="pt-5 pb-5 d-grid gap-2 col-6 mx-auto"
        >
          <div className="d-md-block">
            <Form.Group className="mb-3">
              <input
                name="Email Address"
                autoComplete="on"
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                readOnly={isLoading}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <input
                name="Password"
                autoComplete="on"
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={isLoading}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <div className="container-lg">
            {empityFields && (
              <div>
                <GoAlert />
                <br />
                <h5 className="text-danger">The fields are required</h5>
              </div>
            )}
            {error && (
              <div>
                <GoAlert />
                <br />
                <h5 className="text-danger">{error}</h5>
              </div>
            )}
          </div>
        </Form>
      )}
      <p>
        Don't have an account? <NavLink to="/signup">Create an account</NavLink>
      </p>
    </>
  );
}

export default Login;
