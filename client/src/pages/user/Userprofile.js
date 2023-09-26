import React from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Userprofile.module.css";
import { useAuth } from "../../context/AuthProvider";
import { useUserData } from "../../context/AuthProvider";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profilo() {
  const { auth, logout } = useAuth();
  const { userData } = useUserData();
  const [profile, setProfile] = useState([]);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleDeleteUser = (e) => {
    e.preventDefault();

    try {
      const response = axios.delete(
        `http://localhost:8000/api/users/${userData.id}`,
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );

      logout();
      navigate("/login");
      console.log("Utente eliminato correttamente", response);
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'utente", error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${userData.id}`,
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
        setProfile(data);
        console.log("Profilo: ", profile);
      } catch (error) {
        setError("Errore nel caricamento del profilo");
        console.log(error);
      }
    };
    fetchProfile();

    console.log("Profilo: ", profile);
    // eslint-disable-next-line
  }, []);

  return (
    <Container className={styles.userProfileContainer}>
      <div className="">
        <Col className="pb-1">
          <div xs={2} md={1} className="pt-2 d-grid gap-3  mx-auto">
            <h1>Profilo Utente</h1>
            {auth.isAuthenticated ? (
              <div>
                <p>Benvenuto: {profile.username}</p>
                <div className="text-center w50">
                  <p>La tua Email:</p>
                  <p>{profile.email}</p>
                </div>
                <div className="text-center w50">
                  <p>Il tuo id:</p>
                  <p>{profile._id}</p>
                </div>

                {isDeleteConfirmed ? (
                  <div>
                    <p>Sei sicuro di voler eliminare l'utente?</p>
                    <Button variant="danger" onClick={handleDeleteUser}>
                      Sì
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
                    Cancella utente
                  </Button>
                )}
              </div>
            ) : (
              <p>
                Devi effettuare il login per visualizzare il profilo utente.
              </p>
            )}
            <div>{error && <p className="text-danger">Errore: {error}</p>}</div>
          </div>
        </Col>
      </div>
    </Container>
  );
}

export default Profilo;
