import { useState, useEffect } from "react";
import axios from "axios";
import "./Regret.css";
import { Link, useNavigate } from "react-router-dom";

const Regret = () => {
  const [regrets, setRegrets] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
  fetchRegrets();
}, []);

  const fetchRegrets = () =>{
    axios.get("http://localhost:3000/api/regrets") // ✅ Check if this URL matches backend
    .then(response => setRegrets(response.data))
    .catch(error => console.error("Error fetching regrets:", error));
  }

  const handleDelete = async (id) => {
    console.log("Attempting to delete regret with ID:", id);
    if (!window.confirm("Are you sure you want to delete this regret?")) return;
  
    try {
      const response = await axios.delete(`http://localhost:3000/api/regrets/${id}`);
      console.log("Delete response:", response.data);
  
      setRegrets(regrets.filter(line => line._id !== id));
    } catch (error) {
      console.error("Error deleting regret:", error.response?.data || error.message);
    }
  };
  
  const handleEdit = (id) => {
    console.log("Navigating to edit page with ID:", id);
    navigate(`/edit-regret/${id}`);
  };
  

  return (
    <div className="FullThing-regret">
      <div className="regret-container">
        <h2>Regret Collection</h2>
        <div className="regret-list">
          {regrets.map((line, index) => (
            <div key={index} className="regret-item">
              <blockquote>{line.content}</blockquote>
              <div className="regret-button">
              <button onClick={() => handleEdit(line._id)} className="edit-button-regret">
                  Edit
                </button>
                <button onClick={() => handleDelete(line._id)} className="delete-button-regret">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btngrp-regret">
          <Link to="/add-regret">
            <button className="add-regret-btn">Add your regret</button>
          </Link>
          <Link to="/home-page">
          <button className="back-to-HP-regret">HomePage</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Regret;
