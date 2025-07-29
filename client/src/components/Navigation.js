import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../css/Navigation.css";

function Navigation({func, name}){

    return (
    <div className="navigation">
        <button className="logout_button" onClick={func}>
            {name || "fallback text"}
            <img src="/icons/cat (3).png" alt = "Logout"/>
        </button>
    </div>
    
    );
}

export default Navigation;
