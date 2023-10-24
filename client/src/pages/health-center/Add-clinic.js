import React from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../components/Loader/Loader";
import styles from "./Add-clinic.module.css";
import { useNavigate } from "react-router-dom";
function Addclinic() {
  const { auth } = useAuth();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");
  const [resultId, setResultId] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const navigate = useNavigate();

  const handleAddClinic = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setIsFormDisabled(true);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/healthcenter`,
        {
          name: name,
          address: address,
          city: city,
          district: district,
          region: region,
          zip_code: zip_code,
          phone_number: phone_number,
          email: email,
          website: website,
        },
        {
          headers: {
            Authorization: `${auth.user}`,
          },
        }
      );

      console.log("Clinic added successfully", response.data._id);
      setSucces("Clinic added successfully");
      setResultId(response.data._id);
      setShowForm(false);
    } catch (err) {
      setError("Error: ", err);
      console.log("Error", err.response.data);
    }
  };
  const handleAddReview = (resultId) => {
    navigate(`/addrating/${resultId}`);
  };
  const addNewClinic = () => {
    setName(() => "");
    setAddress(() => "");
    setCity(() => "");
    setDistrict(() => "");
    setRegion(() => "");
    setZip_code(() => "");
    setPhone_number(() => "");
    setEmail(() => "");
    setWebsite(() => "");
    setShowForm(true);
  };
  return (
    <div className={styles.addClinicContainer}>
      {showForm ? (
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <h3>ADD NEW CLINIC</h3>
              <Form
                onSubmit={handleAddClinic}
                disable={isFormDisabled}
                className="pt-4"
              >
                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    md="6"
                    disabled={setIsFormDisabled}
                    className="pb-4"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Clinic Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="pb-4">
                    <Form.Control
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="Address"
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="6" className="pb-4">
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="pb-4">
                    <Form.Control
                      type="text"
                      placeholder="Example: MI"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="6" className="pb-4">
                    <Form.Control
                      type="text"
                      placeholder="Region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="pb-4">
                    <Form.Control
                      type="text"
                      placeholder="Zip code"
                      value={zip_code}
                      onChange={(e) => setZip_code(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" className="pb-4">
                    <Form.Control
                      type="text"
                      placeholder="Phone number"
                      value={phone_number}
                      onChange={(e) => setPhone_number(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" className="pb-4">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" className="pb-4">
                    <Form.Control
                      type="text"
                      placeholder="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3"></Form.Group>
                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="p-2 m-3"
                  >
                    Add
                  </Button>

                  <Button className="p-2 m-3">
                    <NavLink
                      className="text-reset text-decoration-none"
                      to="/dashboard"
                    >
                      Back
                    </NavLink>
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-5">
          {success ? (
            <h3 className="text-success">{success}</h3>
          ) : (
            <h3 className="text-danger">{error}</h3>
          )}
          <Button className="p-2 m-3">
            <NavLink
              onClick={() => handleAddReview(resultId)}
              to={`/addrating/${resultId}`}
              className="text-reset text-decoration-none"
            >
              Add Rating
            </NavLink>
          </Button>
          <Button className="p-2 m-3" onClick={addNewClinic}>
            Add New Clinic
          </Button>
          <Button className="p-2 m-3">
            <NavLink
              className="text-reset text-decoration-none"
              to="/dashboard"
            >
              Back
            </NavLink>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Addclinic;
