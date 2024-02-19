import React from "react";
import styles from "../styles/CardTable.module.css";

const CardTabla = ({ name, consola }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <p>{name}</p>
        <p>{consola}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => console.log("Modificar")}
        >
          ✏️
        </button>
        <button
          className={styles.button}
          onClick={() => console.log("Eliminar")}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default CardTabla;
