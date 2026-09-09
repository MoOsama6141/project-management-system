import axios from "axios";
import { API_V1 } from "@/config/api";

const loginFn = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_V1}/Users/Login`,
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to login ");
  }
};

export default loginFn;
