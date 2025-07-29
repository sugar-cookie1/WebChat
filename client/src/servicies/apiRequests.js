import axios from "axios";

const backendPort = process.env.REACT_APP_BACKEND_PORT || 8000;

const fixedURL = `http://localhost:${backendPort}/api`


export const register = async (username, password) => {
    try {
        const res = await axios.post(`${fixedURL}/register`, { username, password });
        return res.data; 
    } catch (err) {
        console.error("Register API error", err);
        throw err; 
    }
};


export const login = async (username, password) => {
  try {
    console.log("Register payload:", username, password);
    const res = await axios.post(`${fixedURL}/login`, { username, password });
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error message:", error.response.data.message);
      throw error.response; 
    } else {
      console.error("Error:", error);
      throw error;
    }
  }
};

export const fetchRooms = async (username) => {
  try {
    const res = await axios.get(`${fixedURL}/${username}/recent-rooms`);
    return res.data.rooms; 
  } catch (err) {
    console.error("Error fetching rooms:", err);
    throw err; 
  }
}



