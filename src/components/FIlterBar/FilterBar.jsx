import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setType,
  setAmenities,
} from "../../redux/filters/filtersSlice";
import { useState } from "react";
import s from "./FilterBar.module.css";

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [tempLocation, setTempLocation] = useState(filters.location);
  const [selectedType, setSelectedType] = useState(filters.type);
  const [selectedAmenities, setSelectedAmenities] = useState([
    ...filters.amenities,
  ]);
  const [isFocused, setIsFocused] = useState(false); // Стан для фокусу

  const toggleAmenity = (value) => {
    setSelectedAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleApplyFilters = () => {
    dispatch(setLocation(tempLocation));
    dispatch(setType(selectedType));
    dispatch(setAmenities(selectedAmenities));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleApplyFilters();
    }
  };

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
          {["AC", "TV", "Kitchen", "Bathroom", "Automatic"].map((item) => (
            <div
              key={item}
              className={`${s.filtersWrap} ${
                selectedAmenities.includes(item) ? s.active : ""
              }`}
              onClick={() => toggleAmenity(item)}
              onKeyDown={(e) => e.key === "Enter" && toggleAmenity(item)}
              tabIndex={0}
            >
              <input
                type="checkbox"
                value={item}
                checked={selectedAmenities.includes(item)}
                readOnly
              />
              <label className={s.filtersLabel}>{item}</label>
            </div>
          ))}
        </div>

        <h3 className={s.filtersTitle}>Vehicle type</h3>
        <div className={s.radioGroup}>
          {[
            { label: "Van", value: "van" },
            { label: "Fully Integrated", value: "fullyIntegrated" },
            { label: "Alcove", value: "alcove" },
          ].map(({ label, value }) => (
            <div
              key={value}
              className={`${s.radioWrap} ${
                selectedType === value ? s.active : ""
              }`}
              onClick={() => handleTypeChange(value)}
              onKeyDown={(e) => e.key === "Enter" && handleTypeChange(value)}
              tabIndex={0}
            >
              <input
                className={s.radioItem}
                type="radio"
                name="vehicleType"
                value={value}
                checked={selectedType === value}
                readOnly
              />
              <label className={s.radioLabel}>{label}</label>
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
