// import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const GamesAndEvents = () => {
  // const [selectedGameDetails, setSelectedGameDetails] = useState({
  //     id: 1,
  //     name: "Game 1",
  //     // Other game details
  //   });
  const userGames = [
    { id: 1, name: "Game 1" },
    { id: 2, name: "Game 2" },
    // Add more game objects as needed
  ];

  const userEvents = [
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
    // Add more event objects as needed
  ];

  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <div className="w-2/3 bg-gray-100 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Games</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userGames.map((game) => (
            <div
              key={game.id}
              className="border p-4 cursor-pointer hover:bg-gray-200"
            >
              <p className="text-lg font-semibold mb-2">{game.name}</p>
              <Link
                to={`/games/${game.id}`}
                className="block text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <Link
                to="/create-event"
                // state={{ gameDetails: selectedGameDetails }}
                className="mt-2 block bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Host Game
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3 bg-gray-200 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Events Attending</h2>
        <div className="grid gap-4 grid-cols-1">
          {userEvents.map((event) => (
            <div
              key={event.id}
              className="border p-4 cursor-pointer hover:bg-gray-300"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <p className="text-lg font-semibold">{event.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
