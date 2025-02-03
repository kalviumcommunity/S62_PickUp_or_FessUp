import { useState, useEffect } from "react";
import axios from "axios";
import "./Regret.css";
import { Link } from "react-router-dom";

const Regret = () => {
  const [regrets, setRegrets] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:3000/api/regrets") // ✅ Check if this URL matches backend
    .then(response => setRegrets(response.data))
    .catch(error => console.error("Error fetching regrets:", error));
}, []);


  return (
    <div className="FullThing-regret">
      <div className="regret-container">
        <h2>Regret Collection</h2>
        <div className="regret-list">
          {regrets.map((line, index) => (
            <div key={index} className="regret-item">
              <blockquote>{line.content}</blockquote>
            </div>
          ))}
        </div>
        <Link to="/add-regret">
          <button className="add-regret-btn">Add your regret</button>
        </Link>
      </div>
    </div>
  );
};

export default Regret;
