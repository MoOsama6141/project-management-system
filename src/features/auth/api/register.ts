import axios from "axios";
import { API_V1 } from "@/config/api";

const registerData = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_V1}/Users/Register`,
      {
        userName: data.userName,
        email: data.email,
        country: data.country,
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
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
    throw new Error(error.message || "Failed to register user");
  }
};

export default registerData;
