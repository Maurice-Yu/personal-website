import "../css/Login.css";
import { redirect } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
export const Login= ()=> {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with username:', username, 'and password:', password);
  };

  const handleCreateAccount = () => {
    // Add your account creation logic here
    console.log('Creating account with username:', username, 'and password:', password);
  };
    return (
    <div className="main_login_page">
      <table>
        <tbody>
          <tr>
            <td><label>Username:</label></td>
            <td><input type="text" value={username} onChange={handleUsernameChange} /></td>
          </tr>
          <tr>
            <td><label>Password:</label></td>
            <td><input type="password" value={password} onChange={handlePasswordChange} /></td>
          </tr>
          <tr>
            <td colSpan="2" className="button-row">
              <button onClick={() => navigate('/')}>Login</button>
              <button onClick={handleCreateAccount}>Create Account</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
  
  export default Login;