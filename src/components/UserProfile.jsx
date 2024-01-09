import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { userServiceById } from "../services/userService";

export const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

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
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 p-20 bg-[url('https://cdn.steamstatic.com/steamcommunity/public/images/items/55150/a9f13fd1323bef5c16b252c3e4b44b65280bd2a9.jpg')] shadow-lg rounded-md">
      <div className="flex items-center justify-center space-x-10">
        <img
          className="w-40 h-45 object-cover rounded-full"
          src={userData.profile_image_url}
          alt="User Profile"
        />
        <div>
          <h1 className="text-3xl text-slate-50 font-bold mb-1">
            {userData.wargame_username}
          </h1>
          <p className="text-slate-50">
            {userData.user?.first_name} {userData.user?.last_name}
          </p>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      <div className="text-lg">
        <p className="mb-2">
          <span className="font--- text-slate-50">Email:</span>{" "}
          <p className="text-slate-50">{userData.user?.email}</p>
        </p>
        <p className="mb-4">
          <span className="font--- v">Bio:</span>
          <p className="text-slate-50">{userData.bio}</p>
        </p>
        <Link
          to={`/edit-profile/${userData.id}`}
          className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
