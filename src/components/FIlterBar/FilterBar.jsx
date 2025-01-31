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

  // Змінюємо значення у локальному стані (але не в Redux)
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
      <input
        id="Location"
        type="text"
        value={tempLocation}
        onChange={(e) => setTempLocation(e.target.value)}
        onKeyDown={handleKeyDown} // Додаємо обробник Enter
        className={s.locationInput}
      />

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
              onKeyDown={(e) => e.key === "Enter" && toggleAmenity(item)} // Обробка Enter
              tabIndex={0} // Додає можливість навігації через Tab
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
              onKeyDown={(e) => e.key === "Enter" && handleTypeChange(value)} // Обробка Enter
              tabIndex={0} // Додає можливість вибору через Tab
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
