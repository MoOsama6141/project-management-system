import axios from "axios";
import { API_V1 } from "@/config/api";

const addTask = async (payload: {
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
  status: string;
}) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${API_V1}/Task`,
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
    throw new Error(error.message || "Failed to add task");
  }
};

export default addTask;
