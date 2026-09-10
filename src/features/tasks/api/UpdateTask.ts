import axios from "axios";
import { API_V1 } from "@/config/api";

const updateTask = async (
  taskId: string,
  payload: {
    title: string;
    description: string;
    employeeId: string;
    id: string;
    status: string;
  },
) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_V1}/Task/${taskId}`,
      {
        ...payload,
        employeeId: payload.employeeId,
      },
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
    throw new Error(error.message || "Failed to update task");
  }
};

export default updateTask;
