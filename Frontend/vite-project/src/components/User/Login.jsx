import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home-page"); // Redirect after login
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
  <div className="login-header">
    <h2>Login</h2>
  </div>
  <div className="login-form-wrapper">
    <form onSubmit={handleLogin} className="login-form">
      <div className="input-group">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="input-group">
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <div className="login-button-wrapper">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</div>    
  );
};

export default Login;
