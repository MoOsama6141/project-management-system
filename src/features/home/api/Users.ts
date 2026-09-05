import axios from "axios";

const getTaskCount = async () => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.get(
      "https://upskilling-egypt.com:3003/api/v1/Task/count",
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
    throw new Error(error.message || "Failed to get task count");
  }
};

export default getTaskCount;
