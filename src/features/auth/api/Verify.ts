import axios from "axios";

const verifyFn = async (data: any) => {
  try {
    const response = await axios.put(
      "https://upskilling-egypt.com:3003/api/v1/Users/verify",
      {
        email: data.email,
        code: data.code,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to login ");
  }
};

export default verifyFn;
