import { useState, useEffect } from "react";
import axios from "axios";
import "./PickupLine.css";
import { Link } from "react-router-dom";

const PickupLine = () => {
  const [pickupLines, setPickupLines] = useState([]); // State to store pickup lines
  useEffect(() => {
    axios.get("http://localhost:3000/api/pickup-lines") // ✅ Check if this URL matches backend
      .then(response => setPickupLines(response.data))
      .catch(error => console.error("Error fetching pickup lines:", error));
  }, []);


  return (
    <div className="FullThing-pickup">
      <div className="pickup-line-container">
        <h2>Pickup Lines Collection</h2>
        <div className="pickup-lines-list">
          {pickupLines.map((line, index) => (
            <div key={index} className="pickup-line-item">
              <blockquote>{line.content}</blockquote>
            </div>
          ))}
        </div>
        <Link to="/add-pickup-line">
          <button className="add-pickup-line-btn">Add Pickup Line</button>
        </Link>
      </div>
    </div>
  );
};

export default PickupLine;
