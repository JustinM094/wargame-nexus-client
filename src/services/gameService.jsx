export const gameService = () => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch("http://localhost:8000/games", {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};

export const gameServiceById = (id) => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch(`http://localhost:8000/games/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};
