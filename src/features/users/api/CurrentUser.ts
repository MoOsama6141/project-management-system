import axios from "axios";
import { API_V1 } from "@/config/api";

const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_V1}/Users/currentUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to load current user");
  }
};

export default getCurrentUser;
