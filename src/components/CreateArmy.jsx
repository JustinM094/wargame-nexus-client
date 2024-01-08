import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../services/categoryService";

export const CreateArmy = () => {
  const [category, setCategory] = useState([]);
  const [armyData, setArmyData] = useState({
    name: "",
    image_url: "",
    category: 0,
    points: 0,
    description: "",
  });

  useEffect(() => {
    categoryService().then((catArray) => {
      setCategory(catArray);
    });
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArmyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateArmy = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/armies`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...armyData }),
    });
    navigate("/armies");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Army</h1>
      <form onSubmit={handleCreateArmy}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={armyData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={armyData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-600"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={armyData.image_url}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="points"
            className="block text-sm font-medium text-gray-600"
          >
            Points
          </label>
          <input
            type="number"
            id="points"
            name="points"
            value={armyData.points}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600"
          >
            Category
          </label>
          <select
            name="category"
            onChange={handleInputChange}
            className="rounded p-2 text-sm"
            value={armyData.category}
          >
            <option value={0}>Select Category</option>
            {category.map((catobj) => {
              return (
                <option key={catobj.id} value={catobj.id}>
                  {catobj.name}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Army
        </button>
      </form>
    </div>
  );
};
