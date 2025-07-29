import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../servicies/apiRequests";

import Navigation from "../components/Navigation";
import '../css/Login.css'
function Login(){

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const Navigate  = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", username)
            Navigate("/");
            alert("Login successful");
        } catch (error) {
            if (error.status === 400) {
            alert(error.data.message); 
            } 
            else {
            alert("Something went wrong");
            }
        }
    }

    const navi_register = () =>{
        Navigate("/register")
    }

    return(

        <div>
            <Navigation className = "navigation" func = {navi_register} name = {"register"}/>
            <form onSubmit={handleLogin} className = "login-form">
                <input placeholder="UserName" value={username} onChange={(e) => setUserName(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" >Login</button>
            </form>
        </div>
        
    )
};

export default Login;