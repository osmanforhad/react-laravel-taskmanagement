import Axios from "axios";


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