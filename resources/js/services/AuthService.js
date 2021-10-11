import Axios from "axios";

export const checkIfAuthenticated = () => {
  const getLoginData = localStorage.getItem('loginData');
  if (getLoginData !== null) {
    const data = JSON.parse(getLoginData);
    if (data.success && data.access_token !== null) {
      return data.user;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/**
 * registerUser()
 * 
 * @param {object} data 
 */
export const registerUser = async (data) => {
  //api calling
  return await Axios.post(
    "http://localhost/react-laravel/task-management/api/auth/register",
    data).then(res => {
      return res.data;
    });
};

/**
 * loginUser()
 * 
 * @param {object} data 
 */
export const loginUser = async (data) => {
  //api calling
  return await Axios.post(
    "http://localhost/react-laravel/task-management/api/auth/login",
    data).then(res => {
      return res.data;
    });
};