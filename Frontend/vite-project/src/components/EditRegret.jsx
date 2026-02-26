import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRegret.css" 

const EditRegret = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/regrets`)
      .then(response => {
        const Regret = response.data.find(line => line._id === id);
        if (Regret) setContent(Regret.content);
      })
      .catch(error => console.error("Error fetching Regret:", error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/regrets/${id}`, { content });
      navigate("/regret"); // Redirect to main page after update
    } catch (error) {
      console.error("Error updating Regret:", error);
    }
  };

  return (
    <div className="EditRegret">
      <h2>Edit Regret</h2>
      <form onSubmit={handleUpdate}>
        <input
        className="EditRegret-input" 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
        <button className="EditRegret-submit" type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditRegret;
