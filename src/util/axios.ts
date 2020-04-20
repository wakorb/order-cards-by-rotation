import axios from "axios";

const instance = axios.create({
  baseURL: "http://deckofcardsapi.com/api/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
