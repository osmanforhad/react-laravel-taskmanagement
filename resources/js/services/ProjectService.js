import axios from "axios";

export const getProjectList = () => {

}

/**
 * storeNewProject()
 * 
 * @param {object} data 
 */
export const storeNewProject = async(data) => {
    data.user_id = 1;
    //api calling
    return await axios.post('http://localhost/react-laravel/task-management/api/projects', data)
    .then(res => {
      return res.data;
    });
};