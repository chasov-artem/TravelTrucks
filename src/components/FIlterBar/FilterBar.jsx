import styles from "./FilterBar.module.css";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={filters.location}
        onChange={handleChange}
        className={styles.input}
      />
      <label>
        <input
          type="checkbox"
          name="withAC"
          checked={filters.withAC}
          onChange={handleChange}
        />
        With AC
      </label>
      <label>
        <input
          type="checkbox"
          name="withBathroom"
          checked={filters.withBathroom}
          onChange={handleChange}
        />
        With Bathroom
      </label>
    </div>
  );
};

export default FilterBar;
