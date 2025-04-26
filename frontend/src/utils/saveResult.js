import axios from "axios";
export const saveResult = async (result) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/result/saveresult`,
      result,
      { withCredentials: true }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
