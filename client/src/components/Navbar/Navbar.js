import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbr = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    console.log(logout);

    navigate("/login");
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="ps-1">
          <NavLink to="/" className={styles.navlink}>
            <h1>HealthRate</h1>
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0 pe-5">
          <Nav className="d-flex me-auto pl-4 ps-5 position-relative">
            {auth.isAuthenticated ? (
              <>
                <button type="button" className={styles.btnSignup}>
                  <NavLink to="/dashboard" className={styles.navlink}>
                    Esplora
                  </NavLink>
                </button>
                <button type="button" className={styles.btnSignup}>
                  <NavLink to="/userprofile" className={styles.navlink}>
                    Profilo
                  </NavLink>
                </button>
                <button
                  type="button"
                  className={styles.btnSignup}
                  onClick={handleLogout}
                >
                  <NavLink to="/login" className={styles.navlink}>
                    Esci
                  </NavLink>
                </button>
              </>
            ) : (
              <button type="button" className={styles.btnSignup}>
                <NavLink to="/login" className={styles.navlink}>
                  Accedi
                </NavLink>
              </button>
            )}

            {!auth.isAuthenticated && (
              <button type="button" className={styles.btnSignup}>
                <NavLink to="/signup" className={styles.navlink}>
                  Registrati
                </NavLink>
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbr;

/* <Navbar
      expand="sm"
       className="bg-body-tertiary" className={styles.navbar}
    >
      <Container>
        <Navbar.Brand className="ps-1">
          <NavLink to="/" className={styles.navlink}>
            <h1>Health Rate</h1>
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0 pe-5">
          <Nav className="d-flex me-auto pl-4 ps-5 position-relative">
            {auth.isAuthenticated ? (
              <>
                <button type="button" className={styles.btnSignup}>
                  <NavLink to="/dashboard" className="nav-link">
                    Esplora
                  </NavLink>
                </button>
                <button type="button" className={styles.btnSignup}>
                  <NavLink to="/userprofile" className={styles.navlink}>
                    Profilo
                  </NavLink>
                </button>
                <button
                  type="button"
                  className={styles.btnSignup}
                  onClick={handleLogout}
                >
                  <NavLink to="/login" className={styles.navlink}>
                    Logout
                  </NavLink>
                </button>
              </>
            ) : (
              <button type="button" className={styles.btnSignup}>
                <NavLink to="/login" className={styles.navlink}>
                  Accedi
                </NavLink>
              </button>
            )}

            {!auth.isAuthenticated && (
              <button type="button" className={styles.btnSignup}>
                <NavLink to="/signup" className={styles.navlink}>
                  Registrati
                </NavLink>
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */
