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
      // Include user and gamer_events in the request with placeholder values
      const finalValues = {
        ...userData,
        user: {},
        gamer_events: [],
      };

      // Call your service to update the user profile
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
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  if (!userData.id) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const handleDelete = async () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;

    try {
      const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          // Add other headers if needed
        },
      });

      if (response.ok) {
        // Redirect to a page after successful deletion, for example, the home page
        navigate("/login");
      } else {
        // Handle errors, display a message, etc.
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <div>
        {/* Display current user information */}
        <h2 className="text-xl font-bold mb-4">Current Information</h2>
        <img
          className="w-32 h-32 object-cover rounded-full"
          src={userData.profile_image_url}
          alt="User Profile"
        />
        <div>
          <p className="font-bold">Wargame Username:</p>
          {userData.wargame_username}
        </div>
        <div className="mt-2">
          <p className="font-bold">Bio:</p> {userData.bio}
        </div>
        {/* Display more current information as needed */}
      </div>
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Add form fields for editing user profile */}
          {/* Use controlled components with state for each field */}

          {/* Example: */}
          <input
            type="text"
            className="border rounded-md p-3"
            placeholder="profile_image_url"
            name="profile_image_url"
            value={userData.profile_image_url}
            onChange={handleInputChange}
          />

          <input
            type="text"
            className="border rounded-md p-3"
            placeholder="Wargame Username"
            name="wargame_username"
            value={userData.wargame_username}
            onChange={handleInputChange}
          />
          <textarea
            className="border rounded-md p-3"
            placeholder="Bio"
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
          />
          {/* Add more form fields as needed */}
        </div>

        <hr className="my-6 border-t border-gray-300" />

        <div className="mt-6">
          {/* Button to update profile */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
