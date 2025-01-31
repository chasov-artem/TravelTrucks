import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCampers,
  selectCampers,
  selectIsLoading,
  selectError,
} from "../../redux/campers/campersSlice";
import FilterBar from "../../components/FIlterBar/FilterBar";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import s from "./CatalogPage.module.css";
import { CamperList } from "../../components/CamperList/CamperList";
import { selectFilters } from "../../redux/filters/filtersSlice";
import Loader from "../../components/Loader/Loader";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError); // Додано обробку помилок
  const filters = useSelector(selectFilters);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const formattedFilters = {
      page: page || 1, // Значення за замовчуванням для `page`
      limit: 4, // Обмеження на кількість елементів на сторінці
      location: filters.location || undefined,
      type: filters.type || undefined,
      amenities: filters.amenities || [],
    };

    dispatch(fetchCampers(formattedFilters));
  }, [dispatch, page, filters]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>; // Виводимо повідомлення про помилку
  }

  return (
    <div className={s.catalog}>
      <FilterBar />
      <CamperList campers={campers} />
      {!isLoading && Array.isArray(campers) && campers.length > 0 && (
        <LoadMoreButton onClick={() => setPage((prev) => prev + 1)} />
      )}
    </div>
  );
};

export default CatalogPage;
