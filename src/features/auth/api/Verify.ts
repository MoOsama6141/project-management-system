import axios from "axios";
import { API_V1 } from "@/config/api";

const verifyFn = async (data: any) => {
  try {
    const response = await axios.put(
      `${API_V1}/Users/verify`,
      {
        email: data.email,
        code: data.code,
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

export default verifyFn;
