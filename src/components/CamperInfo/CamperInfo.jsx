import s from "./CamperInfo.module.css";

const CamperInfo = ({ camper }) => {
  return (
    <div className={s.camperInfo}>
      <h2 className={s.name}>{camper.name}</h2>

      <ul>
        <li>{camper.type}</li>
        <li>
          <div className={s.rating}>
            <p className={s.raitingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <p className={s.location}>{camper.location}</p>
          </div>
        </li>
        <li className={s.price}>€{camper.price}.00</li>
      </ul>
    </div>
  );
};
export default CamperInfo;
