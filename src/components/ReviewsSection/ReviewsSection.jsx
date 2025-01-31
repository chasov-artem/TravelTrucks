import s from "./Reviews.module.css";

const ReviewsSection = ({ reviews }) => {
  if (!reviews.length) {
    return <p>No reviews available</p>;
  }
  return (
    <div className={s.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={review.id || `review-${index}`} className={s.review}>
            <div className={s.avatarRating}>
              <div className={s.avatar}>
                <span>{review.reviewer_name[0]}</span>
              </div>
              <div className={s.content}>
                <strong className={s.name}>{review.reviewer_name}</strong>
                <p className={s.rating}>Rating: {review.reviewer_rating} / 5</p>
              </div>
            </div>
            <p className={s.comment}>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
