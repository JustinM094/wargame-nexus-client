export const getCurrentUserId = () => {
  const token = JSON.parse(localStorage.getItem("rare_token"));

  if (token) {
    return token.user_id; // Update this based on your JWT structure
  }

  return null;
};
