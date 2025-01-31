import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./BookingForm.module.css";
import * as Yup from "yup";

const BookingForm = () => {
  const [notification, setNotification] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    bookingRange: Yup.array()
      .of(Yup.date().nullable())
      .test("bookingRange", "Booking period is required", (value) =>
        value && value[0] && value[1] ? true : false
      ),
    comment: Yup.string().max(300, "Comment can't exceed 300 characters"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setNotification(
        "Booking successful! Thank you for choosing our service."
      );
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={s.bookingFormContainer}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingRange: [null, null],
          comment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className={s.bookingForm}>
            <div className={s.formGroup}>
              <div className={s.titleWrap}>
                <h3 className={s.title}>Book your campervan now</h3>
                <p className={s.text}>
                  Stay connected! We are always ready to help you.
                </p>
              </div>

              <Field
                type="text"
                name="name"
                className={s.input}
                placeholder="Name*"
              />
              <ErrorMessage name="name" component="div" className={s.error} />
            </div>

            <div className={s.formGroup}>
              <Field
                type="email"
                name="email"
                className={s.input}
                placeholder="Email*"
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.formGroup}>
              <DatePicker
                selected={values.bookingRange[0]}
                onChange={(dates) => setFieldValue("bookingRange", dates)}
                startDate={values.bookingRange[0]}
                endDate={values.bookingRange[1]}
                selectsRange
                placeholderText="Booking date*"
                className={s.datePicker}
                calendarClassName={s.customDatePicker}
                dayClassName={(date) =>
                  date.getDate() === values.bookingRange[0]?.getDate() ||
                  date.getDate() === values.bookingRange[1]?.getDate()
                    ? s.selectedDay
                    : s.day
                }
                weekDayClassName={() => s.weekDay}
                monthClassName={() => s.month}
                yearClassName={() => s.year}
              />
              <ErrorMessage
                name="bookingRange"
                component="div"
                className={s.error}
              />
            </div>

            <div className={s.formGroup}>
              <Field
                as="textarea"
                name="comment"
                className={s.textarea}
                rows="4"
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={s.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={s.submitButton}
            >
              Send
            </button>

            {notification && <p className={s.notification}>{notification}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
