import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setType,
  setAmenities,
} from "../../redux/filters/filtersSlice";
import { useState } from "react"; //

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [tempLocation, setTempLocation] = useState(filters.location);

  const handleLocationChange = (e) => {
    setTempLocation(e.target.value);
  };

  const handleLocationKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setLocation(tempLocation));
    }
  };

  const handleTypeChange = (e) => {
    dispatch(setType(e.target.value));
  };

  const handleAmenitiesChange = (e) => {
    const amenity = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      dispatch(setAmenities([...filters.amenities, amenity]));
    } else {
      dispatch(
        setAmenities(filters.amenities.filter((item) => item !== amenity))
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Location"
        value={tempLocation}
        onChange={handleLocationChange}
        onKeyDown={handleLocationKeyDown}
      />
      <select value={filters.type} onChange={handleTypeChange}>
        <option value="">Select type</option>
        <option value="alcove">Alcove</option>
        <option value="fullyIntegrated">Fully Integrated</option>
        <option value="van">Van</option>
      </select>
      <div>
        <label>
          <input
            type="checkbox"
            value="AC"
            checked={filters.amenities.includes("AC")}
            onChange={handleAmenitiesChange}
          />
          AC
        </label>
        <label>
          <input
            type="checkbox"
            value="kitchen"
            checked={filters.amenities.includes("kitchen")}
            onChange={handleAmenitiesChange}
          />
          Kitchen
        </label>
        <label>
          <input
            type="checkbox"
            value="bathroom"
            checked={filters.amenities.includes("bathroom")}
            onChange={handleAmenitiesChange}
          />
          Bathroom
        </label>
        <label>
          <input
            type="checkbox"
            value="Automatic"
            checked={filters.amenities.includes("Automatic")}
            onChange={handleAmenitiesChange}
          />
          Automatic Transmission
        </label>
      </div>
    </div>
  );
};

export default FilterBar;
