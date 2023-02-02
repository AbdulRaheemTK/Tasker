import axios from "axios";

const baseUrl = "http://localhost:3000";

export default class userServices {
  constructor() {
    console.log("1.User Class initialzed");
  }

  async signup({ fullName, email, password, department }) {
    try {
      const { data } = await axios.post(`${baseUrl}/api/user/signup`, {
        fullName,
        email,
        password,
        department,
      });
      console.log("New user Created", data);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async signin({ email, password }) {
    try {
      const { data } = await axios.post(`${baseUrl}/api/user/signin`, {
        email,
        password,
      });
      console.log(`User Logged In:`, data);
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
