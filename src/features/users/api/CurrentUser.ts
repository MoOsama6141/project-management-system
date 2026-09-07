import axios from "axios";

const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      "https://upskilling-egypt.com:3003/api/v1/Users/currentUser",
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
    throw new Error(error.message || "Failed to load current user");
  }
};

export default getCurrentUser;
