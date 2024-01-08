import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gameServiceById } from "../services/gameService";

export const CreateEvent = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  const [eventData, setEventData] = useState({
    event_name: "",
    event_location: "",
    event_time: "",
    game_id: id,
  });
  const navigate = useNavigate();

  useEffect(() => {
    gameServiceById(id).then((gameObj) => {
      setGameDetails(gameObj);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/events`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...eventData }),
    });

    navigate("/gamesevents");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleCreateEvent}>
        <div className="mb-4"></div>
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
            value={eventData.event_name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <img
            className="w-full h-40 object-cover"
            src={gameDetails.image_url}
            alt={gameDetails.game_name}
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Description:</h3>
          <p>{gameDetails.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Points:</h3>
          <p>{gameDetails.points}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Max Players:</h3>
          <p>{gameDetails.max_players}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">System:</h3>
          <p>{gameDetails.system?.name}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="event_location"
            className="block text-sm font-medium text-gray-600"
          >
            Event Location
          </label>
          <input
            type="text"
            id="event_location"
            name="event_location"
            value={eventData.event_location}
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
            Event time
          </label>
          <input
            type="text"
            id="event_time"
            name="event_time"
            value={eventData.event_time}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Host Event
        </button>
      </form>
    </div>
  );
};
