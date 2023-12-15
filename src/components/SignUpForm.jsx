import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { eventService } from "../services/eventService";

export const SignUpForm = () => {
  const { id } = useParams();

  // State to manage form input
  const [formData, setFormData] = useState({
    event: id,
    army: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add your logic to submit the form data to the server
      await eventService.createEventGamer(formData);

      // After successful submission, you can provide a link to the confirmation page
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up for Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="army"
            className="block text-sm font-medium text-gray-600"
          >
            Select Your Army
          </label>
          <select
            name="army"
            onChange={handleInputChange}
            value={formData.army}
            className="rounded p-2 text-sm"
            required
          >
            {/* Add options based on user's available armies or preferences */}
            <option value="">Select Army</option>
            <option value="1">Army 1</option>
            <option value="2">Army 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {/* Wrap your button with Link */}
        <Link to={`/registration-confirmation/${id}`}>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
};
