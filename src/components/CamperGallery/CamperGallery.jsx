import s from "./CamperGallery.module.css";

const CamperGallery = ({ images }) => {
  console.log(images);
  return (
    <div className={s.gallery}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Camper ${index}`}
          className={s.galleryImage}
        ></img>
      ))}
    </div>
  );
};
export default CamperGallery;
