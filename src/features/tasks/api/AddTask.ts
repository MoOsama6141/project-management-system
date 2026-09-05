import axios from "axios";

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
      "https://upskilling-egypt.com:3003/api/v1/Task",
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
