import axios from "axios";
import { API_V1 } from "@/config/api";

const getProjectTasks = async () => {
  const token = localStorage.getItem("token");
  const url = `${API_V1}/Task`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to get project tasks");
  }
};

export default getProjectTasks;
