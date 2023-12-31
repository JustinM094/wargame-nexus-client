import { useEffect, useState } from "react";
import { armyService } from "../services/armyService";
import { Link } from "react-router-dom";

export const Army = () => {
  const [userArmies, setUserArmies] = useState([]);

  useEffect(() => {
    armyService().then((obj) => {
      const filteredArmies = obj.filter((army) => army.is_owner === true);
      setUserArmies(filteredArmies);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="text-center">
        <img
          src="logo/Your Armies.png"
          alt="Wargame Nexus Logo"
          className="w-auto h-20"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userArmies.map((army) => (
          <Link
            key={army.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
            to={`/armies/${army.id}`}
          >
            <div
              key={army.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                className="w-full h-32 object-cover"
                src={army.image_url}
                alt={army.name}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{army.name}</h2>
                <p className="text-gray-700">Points: {army.points}</p>
                <p className="text-gray-700">Description: {army.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/create-army"
        className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
      >
        Create New
      </Link>
    </div>
  );
};
