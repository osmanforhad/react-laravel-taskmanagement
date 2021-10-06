import axios from "axios";

export const getProjectList = async() => {
  //API calling
  return await axios.get('http://localhost/react-laravel/task-management/api/projects')
  .then(res => {
    return res.data;
  });
};

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

export const updateProject = async(id, data) => {
  data.user_id = 1;
  //api calling
  return await axios.put(`http://localhost/react-laravel/task-management/api/projects/${id}`, data)
  .then(res => {
    return res.data;
  });
};

export const deleteProject = async(id) => {
  //api calling
  return await axios.delete(`http://localhost/react-laravel/task-management/api/projects/${id}`)
  .then(res => {
    return res.data;
  });
};