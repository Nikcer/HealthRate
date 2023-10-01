import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useAuth } from "../../context/AuthProvider";
import { useUserData } from "../../context/AuthProvider";
import Loader from "../../components/Loader/Loader";
function YourRatings() {
  const { userData } = useUserData();
  const { auth } = useAuth();
  const [yourRatings, setYourRatings] = useState();
  const [error, setError] = useState([]);
  console.log("userData: ", userData);

  useEffect(() => {
    const fetchYourRatings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rating/user/${userData.id}`,
          {
            headers: {
              Authorization: auth.user,
            },
          }
        );

        console.log("Response:", response.data);
        const data = await response.data;

        setYourRatings(data);

        console.log(yourRatings);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchYourRatings();
    // eslint-disable-next-line
  }, [userData.id, auth.user]);

  return (
    <div className="p-4">
      {yourRatings ? (
        <div>
          <h1>Le tue recensioni</h1>
          <div p-3="true">
            {yourRatings.ratings.map((rating, index) => (
              <div
                key={rating.id || index}
                className="border border-danger-subtle  mb-2 rounded border-3"
              >
                <Card>
                  <Card.Body>
                    <Card.Subtitle className="mb-4 text-muted">
                      Clinica: {rating.healthCenter.nome}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-4 text-muted">
                      Tempi di attesa: {rating.interval}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-4 text-muted">
                      Esame: {rating.test}
                    </Card.Subtitle>
                    <Card.Text className="mb-4 text-muted">
                      Commento: {rating.comment}
                    </Card.Text>
                    <Card.Subtitle className="mb-4 text-muted">
                      Inserito il: {rating.inputDate}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader /> || (
          <div>{error && <p className="text-danger">Errore: {error}</p>}</div>
        )
      )}
    </div>
  );
}

export default YourRatings;
