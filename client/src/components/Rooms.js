import React from "react";
import {useState, useEffect} from "react";
import { fetchRooms } from "../servicies/apiRequests";
import "../css/Rooms.css"

function Rooms({username, room, setRoom}){

    const [rooms, setRooms]   = useState([]);

    useEffect(() => {
        if (!username) return;
        const getRooms = async () => {
            try {
                const userRooms = await fetchRooms(username);
                setRooms(userRooms);
            } catch (err) {
                console.error("Failed to fetch rooms", err);
            }
        };

        getRooms();
    }, [username]);

    const joinRoom = async (room) =>{
        setRoom(room);
    }

    return(
        <div className="container">
            <div className="join_room">
                <input
                    type="text"
                    placeholder="Enter room name"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button onClick={() => joinRoom(room)}>Join Room</button>
            </div>
            <div className="rooms">
                {rooms.map((room, index) => (
                    <div
                    key={index}
                    className="room-item"
                    onClick={() => joinRoom(room)} 
                    >
                    <div className="room-avatar">
                        <img src="/icons/cat (3).png" alt="Avatar" />
                    </div>
                    <div className="room-info">
                        <h4>{room}</h4>
                        <p>Tap to enter</p>
                    </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default Rooms;
