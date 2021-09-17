import axios from "axios";
import authHeader from "../utils/auth-header";

export const getCurrentUser = () => {
  const USER_CREDENTIALS = JSON.parse(localStorage.getItem("USER_CREDENTIALS"));
  if (USER_CREDENTIALS) {
    return USER_CREDENTIALS;
  }

  return null;
};

export const validateToken = async () => {
  const USER_CREDENTIALS = JSON.parse(localStorage.getItem("USER_CREDENTIALS"));

  if (!USER_CREDENTIALS) {
    return { success: false, user: {} };
  }

  const URL = "/api/user/authenticate";
  const { token } = USER_CREDENTIALS;

  //Authenticate token
  try {
    const res = await axios.get(URL, { headers: authHeader(token) });
    const user = res.data.user;

    // console.log(222222, { user });
    return { success: true, user: { ...user, token } };
  } catch (e) {
    return { success: false, user: {} };
  }
};
