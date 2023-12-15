import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gameServiceById } from "../services/gameService";

export const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    gameServiceById(id).then((eventObj) => {
      setGameDetails(eventObj);
    });
  }, [id]);

  const handleDelete = async () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;

    try {
      const response = await fetch(`http://localhost:8000/games/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          // Add other headers if needed
        },
      });

      if (response.ok) {
        // Redirect to a page after successful deletion, for example, the home page
        navigate("/gamesevents");
      } else {
        // Handle errors, display a message, etc.
        console.error("Failed to delete game");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <article className="bg-white rounded-lg overflow-hidden shadow-md mt-8 mx-auto max-w-2xl">
        <header className="text-3xl font-bold p-4">
          {gameDetails.game_name}
        </header>
        <section className="p-4">
          <img
            className="w-full h-40 object-cover"
            src={gameDetails.image_url}
            alt={gameDetails.game_name}
          />
          <div className="mb-4">
            <h3 className="text-xl font-bold">System:</h3>
            <p>{gameDetails.system?.name}</p>
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
          {/* Add more details based on your event model */}
          <Link
            to={`/create-event/${id}`}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Host Game?
          </Link>
          <Link
            to={`/edit-game/${gameDetails.id}`}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Edit Game?
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Delete Game
          </button>
        </section>
      </article>
    </div>
  );
};
