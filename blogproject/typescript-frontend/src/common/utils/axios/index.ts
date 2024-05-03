import axios from "axios";

const getAccessToken = () => localStorage.getItem("Access Token");

const instance = axios.create({
  baseURL: "http://localhost:3002/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${getAccessToken()}`,
  },
});
export default instance;
