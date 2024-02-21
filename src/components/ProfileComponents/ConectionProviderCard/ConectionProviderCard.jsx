import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import style from "./ConectionProvider.module.sass";

function ConectionProviderCard(props) {

  const { infoUser } = props

  const scrollToTutorial = () => {
    const tutorialSection = document.getElementById('nameWrapper');
    if (tutorialSection) {
      window.scrollTo({
        top: tutorialSection.offsetTop,
        behavior: 'smooth'
      });
    }
    Swal.fire({
      title: '¿Quieres Conectar con el Proveedor?',
      text: `Para poder Conectar con ${infoUser.fullName} debes contratarlo(a) `,
      icon: 'warning',
    })
  };

  return (
    <button onClick={() => scrollToTutorial()} className={style.container}>
      <div className={style.imageContainer}>
        <img className={style.imagen} src={infoUser.image} alt="Imagen" />
      </div>
      <div className={style.infoContainer}>
        <p className={style.name}>Conecta con {infoUser.fullName.split(" ")[0]}</p>
        <div className={infoUser.logged ? style.stateActive : style.stateInactive}>
          {infoUser.logged ? "Conectado" : "Desconectado"}
        </div>
        <p className={style.infoResponse}>Responde aprox. en: <span>{infoUser.timeOfResponse} hs</span></p>
      </div>
    </button>
  );
}

export default ConectionProviderCard;
