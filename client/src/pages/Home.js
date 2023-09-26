import React from "react";
import styles from "./Home.module.css";
import logoOnu from "../asset/img/logoOnu.png";

const Home = () => {
  return (
    <section className={styles.home}>
      <div>
        <h1>Benvnuti in HealthRate!</h1>
        <p>
          Su HealthRate troverete recensioni accurate e aggiornate sui tempi di
          attesa per gli esami ospedalieri e clinici in tutta Italia. Il nostro
          obiettivo è quello di migliorare l'esperienza sanitaria di tutti.
          Raccogliamo e condividiamo informazioni preziose fornite dalla
          community, in modo che tu possa prendere decisioni informate per il
          tuo benessere. Naviga tra le recensioni, scopri i tempi di attesa più
          brevi e prendi il controllo della tua salute.
        </p>
      </div>
      <div className={styles.targetBox}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://unric.org/it/obiettivo-3-assicurare-la-salute-e-il-benessere-per-tutti-e-per-tutte-le-eta/"
        >
          <img src={logoOnu} alt="obbiettivo ONU: Salute e benessere"></img>
        </a>
        <p className={styles.targetText}>
          Ispirato da obiettivo 3 dell'Agenda 2030 per lo Sviluppo Sostenibile
          dell'ONU: Assicurare la salute e il benessere per tutti e per tutte le
          età.
        </p>
      </div>
    </section>
  );
};

export default Home;
