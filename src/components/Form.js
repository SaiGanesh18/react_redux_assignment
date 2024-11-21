import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../store/formSlice";
import axios from "axios";

const Form = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      updateField({
        field: name,
        value: type === "checkbox" ? checked : value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.example.com/submit",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      dispatch(resetForm());
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Fill the form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        {formData.name === "" && <p className="error">Name is required</p>}

        {/* Country */}
        <label>
          Country:
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
          </select>
        </label>

        {/* Agree to Terms */}
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          Agree to Terms
        </label>

        {/* Gender */}
        <div>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
