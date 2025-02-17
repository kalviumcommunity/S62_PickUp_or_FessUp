import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css"
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/signup", { name, email, password });
      alert(response.data.message);
      navigate("/login"); // Redirect to login after signup
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
  <h2 className="signup-title">Signup</h2>
  <form className="signup-form" onSubmit={handleSignup}>
    <input 
      type="text" 
      placeholder="Name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      required 
      className="signup-input"
    />
    <input 
      type="email" 
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      required 
      className="signup-input"
    />
    <input 
      type="password" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      required 
      className="signup-input"
    />
    <div className="button">
    <button type="submit" className="signup-button">Sign Up</button>
    <button type="button" onClick={() => navigate("/login")} className="signup-button">Login</button>
</div>
  </form>
</div>

  );
};

export default Signup;
