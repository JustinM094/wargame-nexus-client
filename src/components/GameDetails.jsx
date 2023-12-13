import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gameServiceById } from "../services/gameService";

export const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    gameServiceById(id).then((eventObj) => {
      setGameDetails(eventObj);
    });
  }, [id]);

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
            <p>{gameDetails.system}</p>
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
        </section>
      </article>
    </div>
  );
};
