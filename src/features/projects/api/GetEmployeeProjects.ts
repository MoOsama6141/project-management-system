import axios from "axios";
const token = window.localStorage.getItem("token");
const getEmployeeProjectes = async (pageNumber = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      "https://upskilling-egypt.com:3003/api/v1/Project/employee",
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

export default getEmployeeProjectes;
