// import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GamesAndEvents = () => {
  // You can fetch user's games and events here using useEffect

  // Placeholder data
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

  // useEffect(() => {
  //   // Fetch user's games and events data
  //   // Update userGames and userEvents state
  // }, []);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-4xl flex">
        {/* User's Games */}
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-bold mb-4">Your Games</h2>
          <ul>
            {userGames.map((game) => (
              <li
                key={game.id}
                className="border p-4 mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/games/${game.id}`)}
              >
                {game.name}
              </li>
            ))}
          </ul>
        </div>

        {/* User's Events */}
        <div className="flex-1 pl-4">
          <h2 className="text-xl font-bold mb-4">Events Attending</h2>
          <ul>
            {userEvents.map((event) => (
              <li
                key={event.id}
                className="border p-4 mb-2 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                {event.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
