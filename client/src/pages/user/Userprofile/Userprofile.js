import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Userprofile.module.css";
import { useAuth } from "../../../context/AuthProvider";
import { useUserData } from "../../../context/AuthProvider";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
function Profilo() {
  const { auth, logout } = useAuth();
  const { userData } = useUserData();
  const [profile, setProfile] = useState([]);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleDeleteUser = (e) => {
    e.preventDefault();

    try {
      const response = axios.delete(
        `${process.env.REACT_APP_API_URL}/api/users/${userData.id}`,
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );

      logout();
      navigate("/login");
      console.log("User successfully deleted!", response);
    } catch (error) {
      console.error("Error", error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${userData.id}`,
          {
            headers: {
              Authorization: `${auth.user}`,
            },
          }
        );
        console.log("Id", userData.id);
        console.log("Response:", response);
        const data = await response.data;
        console.log("data", data);
        setIsLoading(false);
        setProfile(data);
        console.log("Profile: ", profile);
      } catch (error) {
        setError("Error");
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProfile();

    console.log("Profile: ", profile);
    // eslint-disable-next-line
  }, []);

  return (
    <Container className={styles.userProfileContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Col className="pb-1">
            <div xs={2} md={1} className="pt-2 d-grid gap-3  mx-auto">
              <h1>Your Profile</h1>
              {auth.isAuthenticated ? (
                <div>
                  <p>Welcome: {profile.username}</p>
                  <div className="text-center w50">
                    <p>Your Email:</p>
                    <p>{profile.email}</p>
                  </div>
                  <div className="text-center w50">
                    <p>Your id:</p>
                    <p>{profile._id}</p>
                  </div>

                  {isDeleteConfirmed ? (
                    <div>
                      <p>Are you sure you want to delete the user?</p>
                      <Button variant="danger" onClick={handleDeleteUser}>
                        Yes
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsDeleteConfirmed(false)}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => setIsDeleteConfirmed(true)}
                    >
                      Delete User
                    </Button>
                  )}
                </div>
              ) : (
                <h3 className="text-danger">
                  You must log in to view your user profile.
                </h3>
              )}
              <div>
                {error && <h3 className="text-danger">Error: {error}</h3>}
              </div>
            </div>
          </Col>
        </div>
      )}
    </Container>
  );
}

export default Profilo;
