export const eventService = () => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch("http://localhost:8000/events", {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};

export const eventServiceById = (id) => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch(`http://localhost:8000/events/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};

export const eventGamersService = () => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch(`http://localhost:8000/eventgamers`, {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};
