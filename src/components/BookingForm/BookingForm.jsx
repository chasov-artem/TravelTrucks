import { useState } from "react";
import s from "./BookingForm.module.css";

const BookingForm = ({ camperId }) => {
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking request sent for camper ID: ${camperId}`);
  };

  return (
    <form onSubmit={handleSubmit} className={s.bookingForm}>
      <label>
        Check-in Date:
        <input
          type="date"
          value={dates.checkIn}
          onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
        />
      </label>
      <label>
        Check-out Date:
        <input
          type="date"
          value={dates.checkOut}
          onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
        />
      </label>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
