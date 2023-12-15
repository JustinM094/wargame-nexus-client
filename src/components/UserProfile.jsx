import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userServiceById } from "../services/userService";

export const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Fetch user data based on the ID from the URL
    userServiceById(id)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]); // Fetch data whenever the ID changes

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <img
        className="w-full h-40 object-cover"
        src={userData.profile_image_url}
      />
      <p>
        Name: {userData.user?.first_name} {userData.user?.last_name}
      </p>
      <p>Bio: {userData.bio}</p>
      <p>Email: {userData.user?.email}</p>
      {/* Add more details as needed */}
    </div>
  );
};
