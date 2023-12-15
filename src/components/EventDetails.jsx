import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { eventServiceById } from "../services/eventService";
import { eventGamersService } from "../services/eventService";

export const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const [eventGamers, setEventGamers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    eventServiceById(id).then((eventObj) => {
      setEventDetails(eventObj);
    });
    eventGamersService(id).then((gamers) => {
      setEventGamers(gamers);
    });
  }, [id]);

  const handleLeaveEvent = async () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;
    const currentUserId = variable.user_id;

    try {
      // Fetch the event gamer relationship for the current user
      const response = await fetch(
        `http://localhost:8000/eventgamers/${currentUserId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
            // Add other headers if needed
          },
        }
      );

      if (response.ok) {
        const eventGamers = await response.json();

        if (eventGamers.length > 0) {
          // Assuming you want to delete the first event gamer relationship found
          const eventGamerIdToDelete = eventGamers[0].id;

          // Now, make a DELETE request to delete the event gamer relationship
          const deleteResponse = await fetch(
            `http://localhost:8000/eventgamers/${eventGamerIdToDelete}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Token ${token}`,
                // Add other headers if needed
              },
            }
          );

          if (deleteResponse.ok) {
            // Redirect to a page after successful deletion, for example, the home page
            navigate(`/events/${id}`);
          } else {
            // Handle errors during deletion
            console.error("Failed to delete game");
          }
        } else {
          console.warn("Current user is not signed up for this event.");
        }
      } else {
        // Handle errors during fetching event gamers
        console.error("Failed to fetch event gamers");
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
          {/* Add more details based on your event model */}
          <Link
            to={`/event-sign-up/${eventDetails.id}`}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Sign Up?
          </Link>
          <button
            onClick={handleLeaveEvent}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Leave Event
          </button>
        </section>
      </article>
    </div>
  );
};
