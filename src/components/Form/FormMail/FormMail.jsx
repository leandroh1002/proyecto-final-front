import { useState } from "react";
import styles from "./FormMail.module.sass";
import axios from "axios";
import { Validation } from "./ValidationFormMail";

function Form({ handleShowForm, email }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [userData, setUserData] = useState({
    to: email,
    subject: "",
    text: "",
  });
  const [localErrors, setLocalErrors] = useState({
    to: "",
    subject: "*Campo Obligatorio",
    text: "*Campo Obligatorio",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    Validation(name, localErrors, setLocalErrors, { ...userData, [name]: value });
  };

  const handleExperienceAdd = async (event) => {
    event.preventDefault();
    if (Object.values(localErrors).every(error => error === "")) {
      try {
        const response = await axios.post(`${REACT_APP_API_URL}/sendmail`, userData);
        if (response.status === 200) {
          handleShowForm();
          window.alert("Correo enviado exitosamente")
        }
      } catch (error) {
        console.error("Error al enviar el correo electrónico", error);
      }
    } else {
      window.alert("Debes rellenar todos los campos obligatorios")
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Notificar Usuario</p>
        <form
          className={styles.Form}
          onSubmit={(event) => handleExperienceAdd(event)}
        >
          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Mail:</label>
              <input
                className={styles.inputDetail}
                type="email"
                name="to"
                value={userData.to}
                onChange={handleChange}
                placeholder="Ingrese un correo electronico"
              ></input>
              <div className={localErrors.to ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.to ? localErrors.to : "Datos Válidos"}
              </div>
            </div>
          </div>

          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Asunto:</label>
              <input
                className={styles.inputs}
                type="text"
                name="subject"
                value={userData.subject}
                onChange={handleChange}
                placeholder="Asunto"
              />
              <div className={localErrors.subject ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.subject ? localErrors.subject : "Datos Válidos"}
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Mensaje:</label>
              <textarea
                className={styles.inputDetailObservation}
                type="text"
                name="text"
                value={userData.text}
                onChange={handleChange}
                placeholder="Tu Mensaje"
              />
              <div className={localErrors.text ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.text ? localErrors.text : "Datos Válidos"}
              </div>
            </div>
          </div>

          <button className={styles.buttonSave} type="submit">
            Enviar
          </button>
        </form>{" "}
      </div>
    </div>
  );
}

export default Form;
