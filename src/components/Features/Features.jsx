import s from "./Features.module.css";

const Features = ({ camper }) => {
  const renderAmenities = () => {
    const amenitiesList = [];

    amenitiesList.push(
      <li key="transmission">
        <strong>Transmission:</strong> {camper.transmission}
      </li>
    );
    amenitiesList.push(
      <li key="engine">
        <strong>Engine:</strong> {camper.engine}
      </li>
    );

    const optionalAmenities = [
      "AC",
      "bathroom",
      "kitchen",
      "TV",
      "radio",
      "refrigerator",
      "microwave",
      "gas",
      "water",
    ];

    optionalAmenities.forEach((amenity) => {
      if (camper[amenity] === true) {
        amenitiesList.push(
          <li key={amenity}>
            <strong>{amenity}:</strong> Yes
          </li>
        );
      }
    });

    return amenitiesList;
  };

  return (
    <div className={s.features}>
      <h3>Vehicle details</h3>
      <ul>{renderAmenities()}</ul>

      <h3>Technical details</h3>
      <ul>
        <li>
          <strong>Form:</strong> {camper.form}
        </li>
        <li>
          <strong>Length:</strong> {camper.length}
        </li>
        <li>
          <strong>Width:</strong> {camper.width}
        </li>
        <li>
          <strong>Height:</strong> {camper.height}
        </li>
        <li>
          <strong>Tank:</strong> {camper.tank}
        </li>
        <li>
          <strong>Consumption:</strong> {camper.consumption}
        </li>
      </ul>
    </div>
  );
};

export default Features;
