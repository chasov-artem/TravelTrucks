import { useDispatch } from "react-redux";
import s from "./CamperInfo.module.css";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";

const CamperInfo = ({ camper, isFavorite }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.camperInfo}>
      <h2>{camper.name}</h2>
      <p>{camper.description}</p>
      <button onClick={() => dispatch(toggleFavorite(camper))}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <ul>
        <li>{camper.type}</li>
        <li>
          <div className={s.rating}>
            <p className={s.raitingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <p className={s.location}>{camper.location}</p>
          </div>
        </li>
        <li>${camper.price}</li>
      </ul>
    </div>
  );
};
export default CamperInfo;
