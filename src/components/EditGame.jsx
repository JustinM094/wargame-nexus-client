import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gameServiceById } from "../services/gameService";
import { systemService } from "../services/systemService";

export const EditGame = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [systems, setSystems] = useState([]);
  const [gameDetails, setGameDetails] = useState({
    game_name: "",
    image_url: "",
    description: "",
    points: 0,
    max_players: 0,
    system: 0,
  });

  useEffect(() => {
    gameServiceById(id).then((data) => {
      const initialSystemId = data.system ? data.system.id : 0;
      setGameDetails({
        ...data,
        system: initialSystemId,
      });
    });
  }, [id]);

  useEffect(() => {
    systemService().then((sysArray) => {
      setSystems(sysArray);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "system" ? parseInt(value, 10) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const finalValues = {
      game_name: gameDetails.game_name,
      image_url: gameDetails.image_url,
      description: gameDetails.description,
      points: gameDetails.points,
      max_players: gameDetails.max_players,
      system: gameDetails.system,
    };

    await fetch(`http://localhost:8000/games/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValues),
    });
    navigate(`/games/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Game</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="game_name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="game_name"
            name="game_name"
            value={gameDetails.game_name}
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
          <input
            type="text"
            id="description"
            name="description"
            value={gameDetails.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-600"
          >
            Image_url
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={gameDetails.image_url}
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
            value={gameDetails.points}
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
            value={gameDetails.max_players}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="system"
            className="block text-sm font-medium text-gray-600"
          >
            System
          </label>
          <select
            name="system"
            onChange={handleInputChange}
            className="rounded p-2 text-sm"
            value={gameDetails.system.id}
          >
            <option value={0}>{gameDetails.system.name}</option>
            {systems.map((sysobj) => {
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
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update Game
        </button>
      </form>
    </div>
  );
};
