import axios from "axios";
import { API_V1 } from "@/config/api";

const viewProject = async (projectId: string) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_V1}/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to get project");
  }
};

export default viewProject;
