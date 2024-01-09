import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventServiceById } from "../services/eventService";

export const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({
    event_name: "",
    event_location: "",
    event_time: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await eventServiceById(id);
        setEventDetails(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/events/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("rare_token")).token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: eventDetails.host,
          event_name: eventDetails.event_name,
          event_location: eventDetails.event_location,
          event_time: eventDetails.event_time,
          game: eventDetails.game.id,
        }),
      });

      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="event_name"
            className="block text-sm font-medium text-gray-600"
          >
            Event Name
          </label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={eventDetails.event_name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="event_location"
            className="block text-sm font-medium text-gray-600"
          >
            Location
          </label>
          <input
            type="text"
            id="event_location"
            name="event_location"
            value={eventDetails.event_location}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="event_time"
            className="block text-sm font-medium text-gray-600"
          >
            Time
          </label>
          <input
            type="text"
            id="event_time"
            name="event_time"
            value={eventDetails.event_time}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};
