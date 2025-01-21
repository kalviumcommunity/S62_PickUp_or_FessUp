import './PickupLine.css';  
const PickupLine = () => {
  // Static data
  const pickupLines = [
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Is your name Google? Because you have everything I've been searching for.",
    "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    "Do you believe in love at first sight or should I walk by again?",
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
