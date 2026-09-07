import axios from "axios";

const getProjectTasks = async (projectId: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `https://upskilling-egypt.com:3003/api/v1/Task`,
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
    throw new Error(error.message || "Failed to get project tasks");
  }
};

export default getProjectTasks;
