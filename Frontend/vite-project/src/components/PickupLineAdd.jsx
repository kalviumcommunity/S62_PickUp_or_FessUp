import { useState } from "react";
import axios from "axios"; // Import Axios
import "./PickUpLineAdd.css";
import { useNavigate } from "react-router-dom"; // Import navigate hook

const AddPickUpLine = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted PickupLine:", content);

    try {
      const response = await axios.post("http://localhost:3000/api/add-pickup-line", {
        content, // Sending the content in JSON format
      });

      console.log("Response Data:", response.data); // Log response to check success
      setContent(""); // Clear input field

      navigate("/pickup"); // Redirect to pickup page after successful submission
    } catch (error) {
      console.error("Error adding pickup line:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container-pickup">
      <form onSubmit={handleSubmit} className="pickup-form">
        <h2 className="form-title-pickup">Add a Pick-Up Line</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your best pick-up line..."
          className="input-field-pickup"
          rows="4"
          required
        />
        <button type="submit" className="submit-btn-pickup">Submit</button>
      </form>
    </div>
  );
};

export default AddPickUpLine;
