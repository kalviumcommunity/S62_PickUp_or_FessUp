import { useState, useEffect } from "react";
import axios from "axios";
import "./PickupLine.css";
import { Link, useNavigate } from "react-router-dom";

const PickupLine = () => {
  const [pickupLines, setPickupLines] = useState([]);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    fetchPickupLines();
  }, []);

  const fetchPickupLines = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/pickup-lines`)
      .then(response => setPickupLines(response.data))
      .catch(error => console.error("Error fetching pickup lines:", error));
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete pickup line with ID:", id);
    if (!window.confirm("Are you sure you want to delete this pickup line?")) return;

    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/pickup-lines/${id}`);
      console.log("Delete response:", response.data);
      setPickupLines(pickupLines.filter(line => line._id !== id));
    } catch (error) {
      console.error("Error deleting pickup line:", error.response?.data || error.message);
    }
  };

  const handleEdit = (id) => {
    console.log("Navigating to edit page with ID:", id);
    navigate(`/edit-pickup-line/${id}`);
  };

  return (
    <div className="FullThing-pickup">
      <div className="pickup-line-container">
        <h2>Pickup Lines Collection</h2>
        <div className="pickup-lines-list">
          {pickupLines.map((line) => (
            <div key={line._id} className="pickup-line-item">
              <blockquote>{line.content}</blockquote>
              <p className="created-by">Created by: <strong>{line.createdBy || "Unknown"}</strong></p>
              <div className="pickup-line-button">
                <button onClick={() => handleEdit(line._id)} className="edit-button-pickUp">
                  Edit
                </button>
                <button onClick={() => handleDelete(line._id)} className="delete-button-pickUp">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btngrp-pickup">
          <Link to="/add-pickup-line">
            <button className="add-pickup-line-btn">Add Pickup Line</button>
          </Link>
          <Link to="/home-page">
            <button className="back-to-HP-pickup">HomePage</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PickupLine;
