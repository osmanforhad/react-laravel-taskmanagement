import axios from "axios";

export const getTaskList = () => {

}

/**
 * storeNewProject()
 * 
 * @param {object} data 
 */
export const storeNewTask = async(data) => {
  data.project_id = parseInt(data.project_id);
  
    //api calling
    return await axios.post('http://localhost/react-laravel/task-management/api/tasks', data)
    .then(res => {
      return res.data;
    });
};