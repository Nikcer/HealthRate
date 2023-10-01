import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Loader.module.css";
export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <Spinner animation="grow" variant="primary" />
    </div>
  );
}
