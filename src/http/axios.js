import axios from "axios";

const baseURL = "https://www.thegioididong.com";

const instance = axios.create({
  baseURL,
});

export default instance;
