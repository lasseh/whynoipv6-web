import axios from "axios";

export default () => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:9001" // Local API
      : "https://api.whynoipv6.com"; // Production API

  return axios.create({
    baseURL,
    headers: {
      "Content-type": "application/json",
    },
  });
};
