import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { eventServiceById } from "../services/eventService";

export const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    eventServiceById(id).then((eventObj) => {
      setEventDetails(eventObj);
    });
  }, [id]);

  return (
    <div>
      <article className="bg-white rounded-lg overflow-hidden shadow-md mt-8 mx-auto max-w-2xl">
        <header className="text-3xl font-bold p-4">
          {eventDetails.event_name}
        </header>
        <section className="p-4">
          <img
            className="w-full h-40 object-cover"
            src={eventDetails.game?.image_url}
            alt={eventDetails.event_name}
          />
          <div className="mb-4">
            <h3 className="text-xl font-bold">Location:</h3>
            <p>{eventDetails.event_location}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Time:</h3>
            <p>{eventDetails.event_time}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Description:</h3>
            <p>{eventDetails.game?.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Points:</h3>
            <p>{eventDetails.game?.points}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Max Players:</h3>
            <p>{eventDetails.game?.max_players}</p>
          </div>
          {/* Add more details based on your event model */}
        </section>
      </article>
    </div>
  );
};
