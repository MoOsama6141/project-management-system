import axios from "axios";

const viewUser = async (userId: string) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios.get(
      `      https://upskilling-egypt.com:3003/api/v1/Users/${userId}`,
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
    throw new Error(error.message || "Failed to get user");
  }
};

export default viewUser;
