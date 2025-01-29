import s from "./Reviews.module.css";

const ReviewsSection = ({ reviews }) => {
  return (
    <div className={s.reviews}>
      <h3>Customer Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={s.review}>
            <strong>{review.author}</strong>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};
export default ReviewsSection;
