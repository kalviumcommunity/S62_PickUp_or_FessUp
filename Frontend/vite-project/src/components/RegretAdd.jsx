import { useState } from "react";
import axios from 'axios';
import "./RegretAdd.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const AddRegret = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Submitted Regret:", content);
      
    try {
      const response = await axios.post("http://localhost:3000/api/add-regret", {
        content, // Sending the content in JSON format
      });

      console.log("Response Data:", response.data); // Log response to check success
      setContent(""); // Clear input field

      navigate("/regret"); // Redirect to pickup page after successful submission
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
