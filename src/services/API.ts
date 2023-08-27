import axios from "axios";

export default (url = "https://dev.whynoipv6.com/api") => {
// export default (url = "http://localhost:9001/api") => {
  return axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
    },
  });
};
