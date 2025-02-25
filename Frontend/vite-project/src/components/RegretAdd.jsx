import { useState } from "react";
import axios from 'axios';
import "./RegretAdd.css"; 
import { useNavigate } from "react-router-dom";

const AddRegret = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token"); // Get token from storage

      const response = await axios.post(
        "http://localhost:3000/api/add-regret",
        { content },
        { headers: { Authorization: `Bearer ${token}` } } // Attach token
      );

      console.log("Response Data:", response.data);
      setContent(""); 
      navigate("/regret"); 
    } catch (error) {
      console.error("Error adding regret:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container-regret">
      <form onSubmit={handleSubmit} className="regret-form">
        <h2 className="form-title-regret">Share a Regret</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about something you regret..."
          className="input-field-regret"
          rows="4"
          required
        />
        <button type="submit" className="submit-btn-regret">Submit</button>
      </form>
    </div>
  );
};

export default AddRegret;
