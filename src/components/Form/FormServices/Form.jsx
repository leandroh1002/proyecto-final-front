import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserServices } from "../../../redux/actions/index";
import Validation from "../FormProfileProvider/validationFormProfile";
import styles from "./FormServices.module.sass";

function Form({ handleShowForm }) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.infoUserLog);

  const [userData, setUserData] = useState({
    idPeople: userLog.idPeople,
    price: "",
    idOption: "" | "1",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/categories`);
        const data = await response.json();
        const serviceOptions = data.categories.data[0].categories_options.map(
          (option) => {
            return { description: option.description, idOption: option.idOption }
          }
        )
        serviceOptions.sort((a, b) => a.description.localeCompare(b.description));
        setServices(serviceOptions);
      } catch (error) {
        console.error("Error al obtener las opciones de servicios:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServicesAdd = (event) => {
    event.preventDefault();
    try {
      const updatedUserData = {
        ...userData,
        price: userData.price,
        idOption: userData.idOption,
      };

      dispatch(postUserServices(updatedUserData));
      handleShowForm()
    } catch (error) {
      console.error("Error al guardar los servicios y preciso:", error);
    }
  };

  const [localErrors, setLocalErrors] = useState({
    servicio: "",
    precio: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    Validation(property, setLocalErrors, { ...userData, [property]: value });
    setUserData({ ...userData, [property]: value });
  };

  
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Agregue los Servicios que ofrece</p>
        <form className={styles.Form} onSubmit={(event) => handleServicesAdd(event)}>
          <div className={styles.FormDivFlex}>
            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Servicios:</label>
              <select
                className={styles.inputs}
                name="idOption"
                value={userData.servicio}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona los servicios que ofreces
                </option>
                {services.map((service) => (
                  <option key={service.idOption} value={service.idOption}>
                    {service.description}
                  </option>
                ))}
              </select>
              <div
                className={
                  userData.servicio &&
                  (localErrors.servicio
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.servicio
                  ? localErrors.servicio
                    ? localErrors.servicio
                    : "Datos Válidos"
                  : null}
              </div>
            </div>

            <div className={styles.FormDivInputFlex}>
              <label className={styles.labels}>Precio x Hora:</label>
              <input
                className={styles.inputs}
                type="text"
                name="price"
                value={userData.price}
                onChange={handleChange}
                placeholder="$ ARG"
              />
              <div
                className={
                  userData.price &&
                  (localErrors.precio
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.price
                  ? localErrors.precio
                    ? localErrors.precio
                    : "Datos Validos"
                  : null}
              </div>
            </div>
          </div>
          <button
            className={styles.buttonSave}
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
