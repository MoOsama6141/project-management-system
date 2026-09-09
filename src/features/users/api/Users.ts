import axios from "axios";
import { API_V1 } from "@/config/api";

const getUsers = async (pageNumber = 1, pageSize = 10) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_V1}/Users`, {
      params: {
        pageNumber,
        pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to get users");
  }
};

export default getUsers;
