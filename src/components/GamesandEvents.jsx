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
    <div className="flex flex-col items-center justify-between md:p-8">
      <div className="text-center">
        <img
          src="eventsLogo/Your games &.png"
          alt="Wargame Nexus Logo"
          className="w-auto h-20"
        />
      </div>
      <div className="flex flex-col md:flex-row lg:space-x-8">
        <div className="flex-1 md:order-1">
          <div className="text-center">
            <img
              src="eventsLogo/Your Games.png"
              alt="Wargame Nexus Logo"
              className="w-auto h-20"
            />
          </div>
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
            className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300 mt-8 inline-block"
          >
            Create Game
          </Link>
        </div>
        <div className="flex-1 md:order-2">
          <div className="text-center">
            <img
              src="eventsLogo/Your Events.png"
              alt="Wargame Nexus Logo"
              className="w-auto h-20"
            />
          </div>
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
