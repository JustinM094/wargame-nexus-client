import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { armyServiceById } from "../services/armyService";

export const ArmyDetails = () => {
  const [armyDetails, setArmyDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    armyServiceById(id).then((eventObj) => {
      setArmyDetails(eventObj);
    });
  }, [id]);

  return (
    <div>
      <article className="bg-white rounded-lg overflow-hidden shadow-md mt-8 mx-auto max-w-2xl">
        <header className="text-3xl font-bold p-4">{armyDetails.name}</header>
        <section className="p-4">
          <img
            className="w-full h-40 object-cover"
            src={armyDetails.image_url}
            alt={armyDetails.name}
          />
          <div className="mb-4">
            <h3 className="text-xl font-bold">Points:</h3>
            <p>{armyDetails.points}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Description:</h3>
            <p>{armyDetails.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Category:</h3>
            <p>{armyDetails.category?.name}</p>
          </div>
          {/* Add more details based on your event model */}
        </section>
      </article>
      <Link
        to={`/edit-army/${armyDetails.id}`}
        className="mt-2 block bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Edit
      </Link>
    </div>
  );
};
