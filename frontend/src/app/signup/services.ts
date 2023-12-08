import axios from "axios";
import { config } from "../../common";
import { request } from "http";

const requestOptions = {
  headers: { "Content-Type": config.app_json_header },
};
export const create_user = async () => {
  const api_url = config.api_url;
  const graphqlQuery = `
    query  {
    getAllUsers {
      lastName
      email
      firstName
      id
      password
    }
  }`;
  const encodedQuery = encodeURIComponent(graphqlQuery);
  const url = `${api_url}?query=${encodedQuery}`;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        console.log("Data:", response.data);
      } else {
        console.error("GraphQL request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
