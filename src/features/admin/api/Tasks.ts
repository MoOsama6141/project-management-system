import axios from "axios";
const token = window.localStorage.getItem("token");
const adminTasks = async (pageNumber = 1, pageSize = 5) => {
  try {
    const response = await axios.get(
      "https://upskilling-egypt.com:3003/api/v1/Task",
      {
        params: {
          pageNumber,
          pageSize,
        },
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
    throw new Error(error.message || "Failed to get tasks ");
  }
};

export default adminTasks;
