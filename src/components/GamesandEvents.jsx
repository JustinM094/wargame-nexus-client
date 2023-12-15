import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gameService } from "../services/gameService";
import { eventService } from "../services/eventService";

export const GamesAndEvents = () => {
  const [userGames, setUserGames] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    gameService().then((obj) => {
      const filteredGames = obj.filter((game) => game.is_owner === true);
      setUserGames(filteredGames);
    });
  }, []);

  useEffect(() => {
    eventService().then((obj) => {
      const filteredEvents = obj.filter((event) => event.is_owner === true);
      setUserEvents(filteredEvents);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-screen p-4 md:p-8 lg:p-12 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Your Games and Events</h1>
      <div className="flex flex-col md:flex-row lg:space-x-8">
        <div className="flex-1 md:order-1">
          <h2 className="text-2xl font-semibold mb-4">Your Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {userGames.map((game) => (
              <Link
                key={game.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                to={`/games/${game.id}`}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    className="w-full h-48 object-cover"
                    src={game.image_url}
                    alt={game.name}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">{game.game_name}</h2>
                    <p className="text-gray-700">Points: {game.points}</p>
                    <p className="text-gray-700">
                      Description: {game.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/creategame"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-8 inline-block"
          >
            Create Game
          </Link>
        </div>
        <div className="flex-1 md:order-2">
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {userEvents.map((event) => (
              <Link
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                to={`/events/${event.id}`}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  {/* <img
                    className="w-full h-48 object-cover"
                    src={event.game.image_url}
                    alt={event.event_name}
                  /> */}
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">
                      {event.event_name}
                    </h2>
                    <p className="text-gray-700">
                      Location: {event.event_location}
                    </p>
                    <p className="text-gray-700">Time: {event.event_time}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
