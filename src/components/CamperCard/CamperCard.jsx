import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  selectFavorites,
} from "../../redux/favorites/favoritesSlice";
import s from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === camper.id));
  }, [favorites, camper.id]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper));
  };

  const swapCityAndCountry = (locationString) => {
    const parts = locationString.split(",");
    return parts.length === 2
      ? `${parts[1].trim()}, ${parts[0].trim()}`
      : locationString;
  };

  const formatName = (name) =>
    name === "AC"
      ? name
      : name
          .replace(/([A-Z])/g, " $1")
          .replace(/^\s/, "")
          .replace(/\b\w/g, (c) => c.toUpperCase());

  const renderAmenities = () => {
    const amenitiesList = [];
    const amenityIcons = {
      transmission: "icon-diagram",
      engine: "icon-fuel-pump",
      AC: "icon-wind",
      kitchen: "icon-cup-hot",
    };

    ["transmission", "engine"].forEach((amenity) =>
      amenitiesList.push(
        <span className={s.amenity} key={amenity}>
          <svg className={s.icon}>
            <use href={`/icons/icons.svg#${amenityIcons[amenity]}`}></use>
          </svg>
          {formatName(camper[amenity])}
        </span>
      )
    );

    ["kitchen", "AC"].forEach(
      (amenity) =>
        camper[amenity] && (
          <span className={s.amenity} key={amenity}>
            <svg className={s.icon}>
              <use href={`/icons/icons.svg#${amenityIcons[amenity]}`}></use>
            </svg>
            {formatName(amenity)}
          </span>
        )
    );

    return amenitiesList;
  };

  return (
    <li className={s.card}>
      <img
        src={camper.gallery[0].thumb}
        alt={camper.name}
        className={s.image}
      />
      <div className={s.details}>
        <div className={s.header}>
          <div className={s.priceNameWrap}>
            <h2 className={s.name}>{camper.name}</h2>
            <div className={s.priceWrap}>
              <h2 className={s.price}>€{camper.price}.00</h2>
              <button
                className={s.favoriteButton}
                onClick={handleToggleFavorite}
              >
                <svg className={s.favoriteIcon}>
                  <use
                    href={`/icons/icons.svg#icon-heart${
                      isFavorite ? "-red" : ""
                    }`}
                  ></use>
                </svg>
              </button>
            </div>
          </div>
          <div className={s.rating}>
            <svg className={s.ratingIcon}>
              <use href="/icons/icons.svg#star-yellow"></use>
            </svg>
            <p className={s.ratingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <svg className={s.ratingIcon}>
              <use href="/icons/icons.svg#icon-Map"></use>
            </svg>
            <p className={s.location}>{swapCityAndCountry(camper.location)}</p>
          </div>
        </div>
        <p className={s.description}>{camper.description}</p>
        <div className={s.amenities}>{renderAmenities()}</div>
        <Link to={`/catalog/${camper.id}`} className={s.link}>
          Show More
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;
