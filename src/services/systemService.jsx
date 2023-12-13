export const systemService = () => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch("http://localhost:8000/systems", {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};
