import style from "./Message.module.sass"

function MessageToShowClient() {
  
  return (
    <div className={style.introQuote}>
    <div className={style.quoteIcon}></div>
    <div className={style.quoteBox}>
        <p className={style.quote}> "Encontré lo que buscaba super rápido. Hay muchos proveedores disponibles ofreciendo sus servicios y la calidad de los profesionales es excelente!"</p>
        <div className={style.profileBox}>
            <img src="https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png" alt="" className={style.profileImg} />
            <p className={style.profileName}>Claudia Beatriz Gonzales <br/><span>(Cliente)</span></p>
        </div>
    </div>
</div>
  );
}

export default MessageToShowClient;
