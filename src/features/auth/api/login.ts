import axios from "axios";

const loginFn = async (data: any) => {
  try {
    const response = await axios.post(
      "https://upskilling-egypt.com:3003/api/v1/Users/Login",
      {
        email: data.email,
        password: data.password,
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

export default loginFn;
