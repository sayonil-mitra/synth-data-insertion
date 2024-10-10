import axios from "axios";
import CONSTANTS from "../constants/constants.js";

export async function insertData(schemaId = "", schemaData = []) {
  const url = `${CONSTANTS.baseUrl}/${CONSTANTS.dataInsertionUrl}/${schemaId}/instances?upsert=true`;
  const token = `Bearer ${CONSTANTS.token}`;
  try {
    const response = await axios.post(url, schemaData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const responseData = response.data;

    return responseData;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Insert Error response data:", error.response.data);
      console.log("Insert Error response status:", error.response.status);
      console.log("Insert Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Insert Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Insert Error message:", error.message);
    }
    return;
  }
}

export async function fetchData(schemaId = "") {
  const url = `${CONSTANTS.baseUrl}/${CONSTANTS.fetchInstancesUrl}/${schemaId}/instances/list`;
  console.log(url);
  const token = `Bearer ${CONSTANTS.token}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log(`${schemaId}: ${response.data?.msg}`);
    return;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Fetch Error response data:", error.response.data);
      console.log("Fetch Error response status:", error.response.status);
      console.log("Fetch Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Fetch Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Fetch Error message:", error.message);
    }
    return;
  }
}
