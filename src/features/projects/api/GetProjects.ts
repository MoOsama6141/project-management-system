import axios from "axios";
import { API_V1 } from "@/config/api";

const token = window.localStorage.getItem("token");
const getProjects = async (pageNumber = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_V1}/Project`, {
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
    throw new Error(error.message || "Failed to get tasks ");
  }
};

export default getProjects;
