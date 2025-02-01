import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import s from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const imageUrl = camper.gallery[0].thumb;

  const getFavoritesFromStorage = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavoritesFromStorage();
    setIsFavorite(favorites.includes(camper.id));
  }, [camper.id]);

  const toggleFavorite = () => {
    let favorites = getFavoritesFromStorage();

    if (favorites.includes(camper.id)) {
      favorites = favorites.filter((id) => id !== camper.id);
    } else {
      favorites.push(camper.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(favorites.includes(camper.id));
  };

  return (
    <li className={s.card}>
      <img src={imageUrl} alt={camper.name} className={s.image} />
      <div className={s.details}>
        <div className={s.header}>
          <div className={s.priceNameWrap}>
            <h2 className={s.name}>{camper.name}</h2>
            <div className={s.priceWrap}>
              <h2 className={s.price}>€{camper.price}.00</h2>
              <button className={s.favoriteButton} onClick={toggleFavorite}>
                {isFavorite ? (
                  <svg className={s.favoriteIcon}>
                    <use href="/icons/icons.svg#icon-heard-red"></use>
                  </svg>
                ) : (
                  <svg className={s.favoriteIcon}>
                    <use href="/icons/icons.svg#icon-heart"></use>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className={s.rating}>
            <svg className={s.ratingIcon}>
              <use href="/icons/icons.svg#star-yellow"></use>
            </svg>
            <p className={s.raitingText}>{camper.rating}</p>
            <p className={s.reviews}>({camper.reviews.length} Reviews)</p>
            <svg className={s.ratingIcon}>
              <use href="/icons/icons.svg#icon-Map"></use>
            </svg>
            <p className={s.location}>{camper.location}</p>
          </div>
        </div>
        <p className={s.description}>{camper.description}</p>
        <div className={s.amenities}>
          {camper.transmission && <span>Automatic</span>}
          {camper.engine && <span>Petrol</span>}
          {camper.kitchen && <span>Kitchen</span>}
          {camper.AC && <span>AC</span>}
        </div>
        <Link to={`/catalog/${camper.id}`} className={s.link}>
          Show More
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;
