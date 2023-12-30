import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userServiceById } from "../services/userService";

export const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data based on the ID from the URL
    userServiceById(id)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call your service to update the user profile
      const finalValues = {
        wargame_username: userData.wargame_username,
        bio: userData.bio,
        // Add more fields as needed
      };

      // Replace the following URL with your actual update profile endpoint
      await fetch(`http://localhost:8000/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("rare_token")).token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalValues),
      });

      // Redirect to the user profile page after successful update
      navigate(`/user-profile/${id}`);
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  if (!userData.id) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-center">
          {/* Add form fields for editing user profile */}
          {/* Use controlled components with state for each field */}
          {/* Example: */}
          <input
            type="text"
            className="border rounded-md p-2 mr-4"
            placeholder="Wargame Username"
            name="wargame_username"
            value={userData.wargame_username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="border rounded-md p-2"
            placeholder="Bio"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more form fields as needed */}

        <hr className="my-6 border-t border-gray-300" />

        <div>
          {/* Display current user information */}
          <h2 className="text-xl font-bold mb-4">Current Information</h2>
          <p>
            <span className="font-bold">Wargame Username:</span>{" "}
            {userData.wargame_username}
          </p>
          <p className="mt-2">
            <span className="font-bold">Bio:</span> {userData.bio}
          </p>
          {/* Display more current information as needed */}
        </div>

        <div className="mt-6">
          {/* Button to update profile */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};
