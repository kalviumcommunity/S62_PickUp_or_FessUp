import './PickupLine.css';  
const PickupLine = () => {
  // Static data
  const pickupLines = [
    "Are you French? Because Eiffel for you."
  ];

  return (
    <div className="pickup-line-container">
      <h2>Pickup Lines Collection</h2>
      <div className="pickup-lines-list">
        {pickupLines.map((line, index) => (
          <div key={index} className="pickup-line-item">
            <blockquote>{line}</blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickupLine;
