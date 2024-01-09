import axios from "axios";

const url = "http://localhost:8000";

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/users/add`, data);
  } catch (error) {
    console.log("error while adding user", error.message);
  }
};

export const getUser = async () => {
  try {
    let response = await axios.get(`${url}/users/get`);
    return response.data;
  } catch (error) {
    console.log("error while getting user", error.message);
  }
};

export const setConversation = async (data) => {

  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log("error while calling setConversation api", error.message);
  }
};
