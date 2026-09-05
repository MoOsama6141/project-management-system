import axios from "axios";

const updateProject = async (
  payload: { title?: string; description?: string },
) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios.post(
      `https://upskilling-egypt.com:3003/api/v1/project/`,
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
