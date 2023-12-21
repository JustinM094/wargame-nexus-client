export const getCurrentUserId = () => {
  const token = JSON.parse(localStorage.getItem("rare_token"));

  if (token) {
    return token.user_id;
  }

  return null;
};
