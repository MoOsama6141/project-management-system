import axios from "axios";
import { API_V1 } from "@/config/api";

const updateProject = async (
  projectId: string,
  payload: { title?: string; description?: string },
) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_V1}/project/${projectId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to update project");
  }
};

export default updateProject;
