import "./Homepage.css";
import { useState, useEffect } from "react";
import { eventService } from "../services/eventService";
import { Link } from "react-router-dom";

export const AllEvents = () => {
  const [everyEvent, setEveryEvent] = useState([]);

  useEffect(() => {
    eventService().then((eventArray) => {
      setEveryEvent(eventArray);
    });
  }, []);

  return (
    <>
      <section className="welcome-page">
        <div className="recent-recipes">
          <h1>All Upcoming events</h1>
        </div>
        <div>
          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {everyEvent.map((event) => (
              <Link
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                to={`/events/${event.id}`}
              >
                <img
                  className="w-full h-40 object-cover"
                  src={event.game.image_url}
                  alt={event.event_name}
                />
                <div className="p-4">
                  <header className="text-xl font-semibold mb-2">
                    {event.event_name}
                  </header>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">Location:</h3>
                    <p>{event.event_location}</p>
                    <h3 className="text-xl font-bold">Time:</h3>
                    <p>{event.event_time}</p>
                  </div>
                </div>
              </Link>
            ))}
          </article>
        </div>
      </section>
    </>
  );
};
