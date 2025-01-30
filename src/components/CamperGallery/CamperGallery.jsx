import { useState } from "react";
import s from "./CamperGallery.module.css";

const CamperGallery = ({ images = [], camper }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images.length) {
    return <p>No images available</p>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image.original);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={s.gallery}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`Camper ${index}`}
            className={s.galleryImage}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className={s.modal} onClick={handleCloseModal}>
          <img
            src={selectedImage}
            alt="Selected Camper"
            className={s.modalImage}
          />
        </div>
      )}

      <p>{camper.description}</p>
    </>
  );
};

export default CamperGallery;
