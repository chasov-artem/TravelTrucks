import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCampers,
  selectCampers,
  selectIsLoading,
} from "../../redux/campers/campersSlice";
import FilterBar from "../../components/FIlterBar/FilterBar";

import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import styles from "./CatalogPage.module.css";
import { CamperList } from "../../components/CamperList/CamperList";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  const [filters, setFilters] = useState({
    location: "",
    withAC: false,
    withBathroom: false,
  });

  console.log(campers);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCampers({ page, filters }));
  }, [dispatch, page, filters]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  console.log(campers);

  return (
    <div className={styles.catalog}>
      <FilterBar filters={filters} setFilters={setFilters} />
      <CamperList campers={campers} />
      <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} />
    </div>
  );
};

export default CatalogPage;
