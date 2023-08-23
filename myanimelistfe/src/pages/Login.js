import "../css/Login.css";
import { redirect } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';

export const Login= ()=> {
  const navigate = useNavigate();
  const [username, setUsername] = useState('maurice2');
  const [password, setPassword] = useState('asdf');
  const win= window.sessionStorage;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleLogin = () => {
  //   // Add your login logic here
  //   win.setItem("un",username)
  //   win.setItem("pw",password)
  //   console.log('Logging in with username:', username, 'and password:', password);
  // };

  const handleCreateAccount = () => {
    // Add your account creation logic here
    console.log('Creating account with username:', username, 'and password:', password);
  };
  const handleCreate =(username,password)=> {
    fetch('http://127.0.0.1:8000/users/addUser/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
  
            //'X-Requested-With': 'XMLHttpRequest',
        }//, //mode: "no-cors"
        ,
        body: JSON.stringify({"username":username,"password":password})
  
    })
        .then(response => {
            console.log(response.status);
            return response.json() //Convert response to JSON
        })
        .then(data => {
            console.log("test");
  
            //Perform actions with the response data from the view
        })
        //    console.log("hello");
        //    console.log(JSON.stringify(response.json())); //Convert response to JSON
        //});
        //.then(data => {
        //    console.log(data);
        //    return "somethign";
        //    //Perform actions with the response data from the view
        //})
  }

  const handleClick = (username) =>{
    fetch('http://127.0.0.1:8000/users/testGet/'+username+'/', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            //'X-Requested-With': 'XMLHttpRequest',
        }//, //mode: "no-cors"
    })
        .then(response => {
            console.log(response.status);
            return response.json() //Convert response to JSON
        })
        .then(data => {
            console.log(data.username)
            console.log(data.password)

            //Perform actions with the response data from the view
        })
        //    console.log("hello");
        //    console.log(JSON.stringify(response.json())); //Convert response to JSON
        //});
        //.then(data => {
        //    console.log(data);
        //    return "somethign";
        //    //Perform actions with the response data from the view
        //})
}

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
              <button onClick={handleClick(username)}>Login</button>
              <button onClick={handleCreate(username,password)}>Create Account</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
  
  export default Login;