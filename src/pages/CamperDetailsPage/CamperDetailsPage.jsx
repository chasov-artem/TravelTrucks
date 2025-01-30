import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampers, selectCampers } from "../../redux/campers/campersSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import s from "./CamperDetailPage.module.css";
import CamperGallery from "../../components/CamperGallery/CamperGallery";
import CamperInfo from "../../components/CamperInfo/CamperInfo";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";
import BookingForm from "../../components/BookingForm/BookingForm";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    if (!campers.length) {
      dispatch(fetchCampers());
    }
  }, [dispatch, campers.length]);

  const camper = campers.find((camper) => camper.id === id);

  if (!camper) {
    return <Loader />;
  }
  console.log(camper);

  return (
    <div className={s.container}>
      <CamperInfo
        camper={camper}
        isFavourite={favorites.some((fav) => fav.id === camper.id)}
      />
      <CamperGallery images={camper.gallery || []} camper={camper} />
      <ReviewsSection reviews={camper.reviews || []} />
      <BookingForm id={camper.id} />
    </div>
  );
};
export default CamperDetailsPage;
