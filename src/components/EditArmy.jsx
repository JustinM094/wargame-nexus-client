import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { armyServiceById } from "../services/armyService";
import { categoryService } from "../services/categoryService";

export const EditArmy = () => {
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [armyDetails, setArmyDetails] = useState({
    name: "",
    description: "",
    image_url: "",
    points: 0,
    category: 0,
  });

  useEffect(() => {
    armyServiceById(id).then((data) => {
      const initialCategoryId = data.category ? data.category.id : 0;
      setArmyDetails({
        ...data,
        category: initialCategoryId,
      });
    });
  }, [id]);

  useEffect(() => {
    categoryService().then((catArray) => {
      setCategories(catArray);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArmyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "category" ? parseInt(value, 10) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const finalValues = {
      name: armyDetails.name,
      description: armyDetails.description,
      image_url: armyDetails.image_url,
      points: armyDetails.points,
      category: armyDetails.category,
    };

    await fetch(`http://localhost:8000/armies/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValues),
    });
    navigate(`/armies/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Army</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Army Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={armyDetails.name}
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
          <input
            type="text"
            id="description"
            name="description"
            value={armyDetails.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-600"
          >
            Image_url
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={armyDetails.image_url}
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
            value={armyDetails.points}
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
            value={armyDetails.category.id}
          >
            <option value={0}>{armyDetails.category.name}</option>
            {categories.map((catobj) => {
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
          className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition duration-300"
        >
          Update Army
        </button>
      </form>
    </div>
  );
};
