import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <div className="flex items-center justify-center space-x-6">
        <img
          className="w-32 h-32 object-cover rounded-full"
          src={userData.profile_image_url}
          alt="User Profile"
        />
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {userData.wargame_username}
          </h1>
          <p className="text-gray-600">
            {userData.user?.first_name} {userData.user?.last_name}
          </p>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      <div className="text-lg">
        <p className="mb-2">
          <span className="font--- text-gray-700">Email:</span>{" "}
          {userData.user?.email}
        </p>
        <p className="mb-4">
          <span className="font--- text-gray-700">Bio:</span> {userData.bio}
        </p>
        <Link
          to={`/edit-profile/${userData.id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
