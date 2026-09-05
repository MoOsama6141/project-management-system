import axios from "axios";

const ToggleUser = async (userId: string) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios.put(
      `https://upskilling-egypt.com:3003/api/v1/Users/${userId}`,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to toggle user");
  }
};

export default ToggleUser;
