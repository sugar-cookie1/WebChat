import { io } from "socket.io-client";
const port = process.env.REACT_APP_PORT||8000;

class SocketFunctions{
    constructor(){
        this.socket = io(`http://localhost:${port}` ,{
            transports: ["websocket"],
        });
    }

    joinRoom(username, room){
        this.socket.emit("join_room", {username, room});
    }
    //send a message
    sendMessage(username, room, currentMessage) {
        try {
            if (currentMessage.trim() === "") {
                return { success: false, error: "Message is empty" };
            }

            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                hour: new Date().getHours(),
                minute: new Date().getMinutes()
            };

            this.socket.emit("send_message", messageData);
            return { success: true, message: "Message sent" };

        } catch (e) {
            return { success: false, error: e.message || "Unknown error" };
        }
    }

    receiveMessage(callback){
        this.socket.on("receive_message", callback);
    }
    previousMessages(callback){
        this.socket.on("previous_message",callback);
    }
    cleanUpListeners(){
        this.socket.off("previous_message");
        this.socket.off("receive_message");
        this.socket.off("join_room");
    }

};
const socketFunctions = new SocketFunctions();
export default socketFunctions;