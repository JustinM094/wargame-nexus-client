import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { systemService } from "../services/systemService";

export const CreateGame = () => {
  const [system, setSystem] = useState([]);
  const [gameData, setGameData] = useState({
    game_name: "",
    description: "",
    image_url: "",
    points: 0,
    max_players: 0,
    system_id: 0,
  });

  useEffect(() => {
    systemService().then((sysArray) => {
      setSystem(sysArray);
    });
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/games`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...gameData }),
    });

    navigate("/gamesevents");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Game</h1>
      <form onSubmit={handleCreateGame}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="game_name"
            name="game_name"
            value={gameData.game_name}
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
            value={gameData.description}
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
            value={gameData.image_url}
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
            value={gameData.points}
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
            value={gameData.max_players}
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
            value={gameData.system_id}
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
        <button
          type="submit"
          className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
        >
          Create Game
        </button>
      </form>
    </div>
  );
};
