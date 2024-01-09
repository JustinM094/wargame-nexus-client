import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gameServiceById } from "../services/gameService";

export const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteModal = useRef();

  useEffect(() => {
    gameServiceById(id).then((eventObj) => {
      setGameDetails(eventObj);
    });
  }, [id]);

  const handleDelete = async (event) => {
    event.preventDefault();
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;

    try {
      const response = await fetch(`http://localhost:8000/games/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        navigate("/gamesevents");
      } else {
        console.error("Failed to delete game");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    deleteModal.current.showModal();
  };

  return (
    <div>
      <article className="bg-white rounded-lg overflow-hidden shadow-md mt-8 mx-auto max-w-2xl">
        {/* Delete Modal Designated Below*/}
        <dialog
          className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white"
          ref={deleteModal}
        >
          <div>Are you sure you want to delete this tag?</div>
          <div className="__btn-container__ flex justify-around mt-6">
            <button
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              onClick={(event) => {
                handleDelete(event);
              }}
            >
              Ok
            </button>
            <button
              className="btn-delete"
              onClick={() => deleteModal.current.close()}
            >
              Cancel
            </button>
          </div>
        </dialog>
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
          <Link
            to={`/create-event/${id}`}
            className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
          >
            Host Game
          </Link>
          <Link
            to={`/edit-game/${gameDetails.id}`}
            className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
          >
            Edit Game
          </Link>
          <button
            onClick={(event) => handleDelete(event)}
            className="bg-orange-800 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Delete Game
          </button>
        </section>
      </article>
    </div>
  );
};
