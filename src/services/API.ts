import axios from "axios";

export default (url = "https://api.ipv6.fail/") => {
// export default (url = "http://localhost:9001/api") => {
  return axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
    },
  });
};
