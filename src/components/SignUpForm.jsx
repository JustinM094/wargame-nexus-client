import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { armyService } from "../services/armyService";

export const SignUpForm = () => {
  const [userArmies, setUserArmies] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    event: id,
    army: 0,
  });

  useEffect(() => {
    armyService().then((obj) => {
      const filteredArmies = obj.filter((army) => army.is_owner === true);
      setUserArmies(filteredArmies);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/eventgamers`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    navigate(`/events/${id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up for Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="army"
            className="block text-sm font-medium text-gray-600"
          >
            Select Your Army
          </label>
          <select
            name="army"
            onChange={handleInputChange}
            className="rounded p-2 text-sm"
            value={formData.army.id}
          >
            <option value={0}>Select Army</option>
            {userArmies.map((armobj) => (
              <option key={armobj.id} value={armobj.id}>
                {armobj.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
