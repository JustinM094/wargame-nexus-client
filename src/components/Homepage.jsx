import "./Homepage.css";
import { useState, useEffect } from "react";
import { eventService } from "../services/eventService";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [everyEvent, setEveryEvent] = useState([]);
  //   const navigate = useNavigate();

  useEffect(() => {
    eventService().then((eventArray) => {
      setEveryEvent(eventArray);
      console.log("events set");
    });
  }, []);

  return (
    <>
      <section className="welcome-page">
        <div className="welcome-background bg-black text-white py-16">
          <h1 className="text-4xl font-bold mb-4">
            <span>Welcome to</span>
          </h1>
          <h1 className="text-5xl font-bold">
            <span>Wargame Nexus</span>
          </h1>
        </div>
        <div className="recent-recipes">
          <h2>Upcoming Events</h2>
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
                  {/* Add more event details if needed */}
                </div>
              </Link>
            ))}
          </article>
        </div>
      </section>
    </>
  );
};
