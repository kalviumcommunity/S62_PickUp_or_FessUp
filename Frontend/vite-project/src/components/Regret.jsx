import './Regret.css';  
const Regret = () => {
  // Static data
  const Regret = [
    "I called my crush by my ex's name"
  ];

  return (
    <div className="FullThing-regret">
        <div className="regret-container">
        <h2>Regret Collection</h2>
        <div className="regret-list">
            {Regret.map((line, index) => (
            <div key={index} className="regret-item">
                <blockquote>{line}</blockquote>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Regret;
