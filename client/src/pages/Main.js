import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css"; 

//componenents 
import Navigation from "../components/Navigation.js";
import Chat from "../components/Chat";
import Rooms from "../components/Rooms.js"

function Main() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [room, setRoom] = useState("");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className="page">
            <div className="navigation-bar">
                <Navigation func={logout} name="logout" />
            </div>
            <div className="main-content">
                <div className="rooms-panel">
                    <Rooms username={username} room={room} setRoom={setRoom} />
                </div>
                <div className="chat-panel">
                    <Chat username={username} room={room} />
                </div>
        </div>
</div>
    );
}

export default Main;
