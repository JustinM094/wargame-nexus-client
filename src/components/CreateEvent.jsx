import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { systemService } from "../services/systemService";

export const CreateEvent = () => {
  const [system, setSystem] = useState([]);
  const [eventData, setEventData] = useState({
    event_name: "",
    event_location: "",
    event_time: "",
    points: 0,
    max_players: 0,
    system_id: 0,
    // Add more fields as needed
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    systemService().then((sysArray) => {
      setSystem(sysArray);
    });

    // Check if game details are present in the location state
    const gameDetails = location.state?.gameDetails;
    if (gameDetails) {
      // Pre-fill the form fields with game details
      setEventData((prevData) => ({
        ...prevData,
        event_name: gameDetails.name,
        // Add more fields as needed
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/games`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...eventData }),
    });

    // Add your logic to send the eventData to the server for creation
    // For example, you can use fetch or axios to make a POST request

    // After successful creation, you can navigate to the game details page or any other page
    navigate("/gamesevents");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleCreateEvent}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Name
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-600"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={eventData.image_url}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="points"
            className="block text-sm font-medium text-gray-600"
          >
            Points
          </label>
          <input
            type="number"
            id="points"
            name="points"
            value={eventData.points}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="max_players"
            className="block text-sm font-medium text-gray-600"
          >
            Max Players
          </label>
          <input
            type="number"
            id="max_players"
            name="max_players"
            value={eventData.max_players}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="system_id"
            className="block text-sm font-medium text-gray-600"
          >
            System
          </label>
          <select
            name="system_id"
            onChange={handleInputChange}
            className="rounded p-2 text-sm"
            value={eventData.system_id}
          >
            <option value={0}>Select System</option>
            {system.map((sysobj) => {
              return (
                <option key={sysobj.id} value={sysobj.id}>
                  {sysobj.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* Add more input fields for other Game model properties */}
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
