import React from 'react';
import { useState } from 'react';
import "../css/Register.css";
import {useNavigate, Navigate} from "react-router-dom";
import Navigation from '../components/Navigation';
import "../css/Navigation.css";
import { register } from '../servicies/apiRequests';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword ] = useState('');
  const navigate =  useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(confirmPassword === password){
      console.log("requst being sent by ", username )
      const data = await register(username,password);
      localStorage.setItem('token',data.token);
      localStorage.setItem("username", username)
      navigate("/main");
      alert('Registration successful');
    }
    else{
      alert('passwords dont match');
      setConfirmPassword("");
    }

  };
  const navi_login = () =>{
          navigate("/login");
    }
  return (
    <div>
        <Navigation func = {navi_login}  name = {"login"}/>
        <form onSubmit={handleRegister} className='register-form'>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="confirm password" type = "password" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button type="submit">Register</button>
        </form>
    </div>
  );
}

export default Register;
