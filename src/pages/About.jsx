// src/pages/About.jsx
import { BUSINESS_INFO } from "@constants";
import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.about}>
      <div className="container">
        <h2>About CampusPlate</h2>
        <p className={styles.intro}>
          A student initiative created for <strong>Professional Practice 3 (PFP362S)</strong>
        </p>

        <div className={styles.content}>
          <h3>Our Vision</h3>
          <p>
            {BUSINESS_INFO.name} delivers affordable, nutritious meals to university students in residences and hostels
            - because every student deserves to eat well without breaking the bank.
          </p>

          <h3>Team Members</h3>
          <ul>
            <li>
              <strong>Charlton Solomons (220483418)</strong> - Team Leader
            </li>
            <li>
              <strong>Esaile Franck Siani Djiakeng (220274142)</strong> - Researcher
            </li>
            <li>
              <strong>Mpumelelo Sithole (230526934)</strong> - Scribe
            </li>
            <li>
              <strong>Sinentlantla Slayi (222133872)</strong> - Designer
            </li>
          </ul>

          <h3>Key Insights from Survey</h3>
          <p>
            Students want meals between <strong>R30–R50</strong>, prefer delivery/pickup, and struggle most with price
            and time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
