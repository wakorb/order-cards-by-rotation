import axios from "axios";

const instance = axios.create({
  baseURL: "https://deckofcardsapi.com/api/",
  timeout: 1000,
});

export default instance;
