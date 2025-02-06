import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPickupLine = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/pickup-lines`)
      .then(response => {
        const pickupLine = response.data.find(line => line._id === id);
        if (pickupLine) setContent(pickupLine.content);
      })
      .catch(error => console.error("Error fetching pickup line:", error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/pickup-lines/${id}`, { content });
      navigate("/pickup"); // Redirect to main page after update
    } catch (error) {
      console.error("Error updating pickup line:", error);
    }
  };

  return (
    <div>
      <h2>Edit Pickup Line</h2>
      <form onSubmit={handleUpdate}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPickupLine;
