import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { eventServiceById } from "../services/eventService";
import { eventGamersService } from "../services/eventService";
import { userServiceById } from "../services/userService";

export const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const [eventGamers, setEventGamers] = useState([]);
  const [currentGamer, setCurrentGamer] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const currentUserId = variable.user_id;
  const isHost = currentGamer.id === eventDetails.host;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventObj, gamers, user] = await Promise.all([
          eventServiceById(id),
          eventGamersService(id),
          userServiceById(currentUserId),
        ]);

        setEventDetails(eventObj);
        setEventGamers(gamers);
        setCurrentGamer(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, currentUserId]);

  const handleLeaveEvent = async () => {
    const token = variable.token;

    try {
      const foundGamerEvent = currentGamer.gamer_events.find(
        (gamerEvent) => gamerEvent.event.id === eventDetails.id
      );

      if (!foundGamerEvent) {
        console.warn("Current user is not signed up for this event.");
        return;
      }
      const deleteResponse = await fetch(
        `http://localhost:8000/eventgamers/${foundGamerEvent.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (deleteResponse.ok) {
        const [eventObj, gamers] = await Promise.all([
          eventServiceById(id),
          eventGamersService(id),
        ]);

        setEventDetails(eventObj);
        setEventGamers(gamers);

        navigate(`/events/${id}`);
      } else {
        console.error("Failed to delete event gamer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;

    try {
      const response = await fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        navigate("/gamesevents");
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          <div className="mb-4">
            <h3 className="text-xl font-bold">Signed Up Users:</h3>
            <ul>
              {eventGamers.map((gamer) => (
                <li key={gamer.id}>{gamer.user.wargame_username}</li>
              ))}
            </ul>
          </div>
          <Link
            to={`/event-sign-up/${eventDetails.id}`}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Sign Up
          </Link>
          {isHost && (
            <Link
              to={`/edit-event/${id}`}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-4"
            >
              Edit Event
            </Link>
          )}
          <button
            onClick={handleLeaveEvent}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Leave Event
          </button>
          {isHost && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Delete Event
            </button>
          )}
        </section>
      </article>
    </div>
  );
};
