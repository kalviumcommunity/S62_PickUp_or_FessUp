import { Link } from "react-router-dom";
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Pink Section */}
      <div className="pink-section">
        <h1 className="home-heading">PickUp Line</h1>
        <Link to="/pickup" className="home-button pink-button">
          Go to PickUp Lines
        </Link>
      </div>

      {/* Grey Section */}
      <div className="grey-section">
        <h1 className="home-heading">Regret</h1>
        <Link to="/regret" className="home-button grey-button">
          Go to Regrets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
