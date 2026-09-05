import axios from "axios";

const deleteTask = async (taskId: string) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `https://upskilling-egypt.com:3003/api/v1/Task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to delete task");
  }
};

export default deleteTask;
