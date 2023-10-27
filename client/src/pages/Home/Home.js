import React from "react";
import styles from "./Home.module.css";
import logoOnu from "../../asset/img/logoOnu.png";

const Home = () => {
  return (
    <section d="true" className={styles.home}>
      <div>
        <h1>Welcome in HealthRate!</h1>
        <p>
          On HealthRate, you will find accurate and up-to-date reviews on wait
          times for hospital and clinical exams. Our goal is to enhance the
          healthcare experience for everyone. We gather and share valuable
          information provided by the community, so you can make informed
          decisions for your well-being. Browse through reviews, discover the
          shortest wait times, and take control of your health.
        </p>
      </div>
      <div d="true" className={styles.targetBox}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          d="true"
          href="https://unric.org/it/obiettivo-3-assicurare-la-salute-e-il-benessere-per-tutti-e-per-tutte-le-eta/"
        >
          <img
            d="true"
            src={logoOnu}
            alt="obbiettivo ONU: Salute e benessere"
          ></img>
        </a>
        <p className={styles.targetText}>
          Inspired by Goal 3 of The Sustainable Development Agenda: Ensure
          healthy lives and promote well-being for all at all ages.
        </p>
      </div>
    </section>
  );
};

export default Home;
