import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import socketFunctions from "../servicies/socketFunctions";
import "../css/Chat.css";

function Chat({username , room}){
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!room || !username) return;
        socketFunctions.joinRoom(username, room);
        socketFunctions.previousMessages((allMessages)=>{
            setMessages(allMessages);
        });
        socketFunctions.receiveMessage((msg) =>{ // set up once and changes every time msg changes.
            setMessages((prev) => [...prev, msg]);
        });
        return () => {
            socketFunctions.cleanUpListeners();
        };
    }, [room, username]);

    const sendMessage = async () => {
        const confirmation = await socketFunctions.sendMessage(username,room,currentMessage);
        console.log(confirmation);
        setCurrentMessage("");
    }

    return (
        <div className="app">
            <div className="chat-wrapper">
                <div className = "chat-header">
                    <p>Live Chat</p>
                </div>
                <div className = "chat-body">
                    <div className="chat-container">
                        <div className = "chat-box">
                            {messages.map((msg, index) => 
                            <div key={index} className="message">
                                <strong>{msg.author}</strong>: {msg.message} <em>{msg.hour}:{msg.minute}</em>
                            </div>
                            )}
                        </div>

                        <div className = "chat-footer">
                            <input type = "text"
                                placeholder="text.."
                                onChange={(event => {
                                    setCurrentMessage(event.target.value);
                                })}
                                onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                        sendMessage();
                                        }
                                }}
                                value={currentMessage}
                                />
                            <button onClick={sendMessage}>&#9658;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chat;
