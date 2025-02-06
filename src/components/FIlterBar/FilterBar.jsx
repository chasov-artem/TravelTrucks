import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import {
  setLocation,
  setForm,
  setAmenities,
} from "../../redux/filters/filtersSlice";
import s from "./FilterBar.module.css";

const amenitiesIcons = {
  AC: "/icons/icons.svg#icon-wind",
  Automatic: "/icons/icons.svg#icon-diagram",
  Kitchen: "/icons/icons.svg#icon-cup-hot",
  TV: "/icons/icons.svg#icon-tv",
  Bathroom: "/icons/icons.svg#icon-ph_shower",
};

const vehicleTypeIcons = {
  Van: "/icons/icons.svg#icon-bi_grid-1x2",
  FullyIntegrated: "/icons/icons.svg#icon-bi_grid",
  Alcove: "/icons/icons.svg#icon-bi_grid-3x3-gap",
};

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const formatLocation = useCallback((location) => {
    if (!location) return "";
    const parts = location.split(", ").map((part) => part.trim());
    return parts.length === 2 ? `${parts[1]}, ${parts[0]}` : location;
  }, []);

  const [tempLocation, setTempLocation] = useState(
    formatLocation(filters.location)
  );
  const [selectedForm, setSelectedForm] = useState(filters.form);
  const [selectedAmenities, setSelectedAmenities] = useState([
    ...filters.amenities,
  ]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setTempLocation(formatLocation(filters.location));
  }, [filters.location, formatLocation]);

  const toggleAmenity = useCallback((value) => {
    setSelectedAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }, []);

  const handleFormChange = useCallback((value) => {
    setSelectedForm(value);
  }, []);

  const handleApplyFilters = useCallback(() => {
    const formattedForm = selectedForm === "Van" ? "panelTruck" : selectedForm;

    dispatch(setLocation(formatLocation(tempLocation)));
    dispatch(setForm(formattedForm));
    dispatch(setAmenities(selectedAmenities));
  }, [dispatch, tempLocation, selectedForm, selectedAmenities, formatLocation]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleApplyFilters();
      }
    },
    [handleApplyFilters]
  );

  return (
    <div className={s.filterBar}>
      <label className={s.locationLabel} htmlFor="Location">
        Location
      </label>
      <div className={s.locationInputWrapper}>
        <svg className={s.locationIcon}>
          <use
            href={
              isFocused
                ? "/icons/icons.svg#icon-Map"
                : "/icons/icons.svg#icon-Map-1"
            }
          ></use>
        </svg>
        <input
          id="Location"
          type="text"
          value={tempLocation}
          placeholder="City"
          onChange={(e) => setTempLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={s.locationInput}
        />
      </div>

      <p className={s.filtersText}>Filters</p>
      <div className={s.filtersContainer}>
        <h3 className={s.filtersTitle}>Vehicle equipment</h3>
        <div className={s.allFiltersWrap}>
          {Object.entries(amenitiesIcons).map(([item, icon]) => (
            <div
              key={item}
              className={`${s.filtersWrap} ${
                selectedAmenities.includes(item) ? s.active : ""
              }`}
              onClick={() => toggleAmenity(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === "Enter" && toggleAmenity(item)}
            >
              <svg className={s.filterIcon}>
                <use href={icon}></use>
              </svg>
              <label className={s.filtersLabel}>{item}</label>
            </div>
          ))}
        </div>

        <h3 className={s.filtersTitle}>Vehicle type</h3>
        <div className={s.radioGroup}>
          {Object.entries(vehicleTypeIcons).map(([value, icon]) => (
            <div
              key={value}
              className={`${s.radioWrap} ${
                selectedForm === value ? s.active : ""
              }`}
              onClick={() => handleFormChange(value)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === "Enter" && handleFormChange(value)}
            >
              <svg className={s.radioIcon}>
                <use href={icon}></use>
              </svg>
              <label className={s.radioLabel}>
                {value.replace(/([A-Z])/g, " $1").trim()}
              </label>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={s.searchButton}
          onClick={handleApplyFilters}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
