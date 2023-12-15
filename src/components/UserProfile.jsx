import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userServiceById } from "../services/userService";

export const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    userServiceById(id)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {/* Display user details using userData */}
    </div>
  );
};
