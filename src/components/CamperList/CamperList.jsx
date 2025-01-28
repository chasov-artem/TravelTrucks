import CamperCard from "../CamperCard/CamperCard";

export const CamperList = ({ campers }) => {
  console.log(campers);
  return (
    <ul>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </ul>
  );
};
