function apiCall(url, method, bodyContent, auth) {
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      method: method,
      body: JSON.stringify(bodyContent)
    });
  }
  
  export function createUser(content) {
    return apiCall('http://localhost:4201/user', 'POST', content);
  }
    
  
  export function getUser() {
    return apiCall('http://localhost:4201/user', 'GET', undefined);
  }

  export function getOneUser(id) {
    return apiCall('http://localhost:4201/user/'+id, 'GET', undefined);
  }

  export function updateOneUser(content, id){    
    return apiCall('http://localhost:4201/user/'+id, 'PUT', content, undefined);
  }

  export function getUserProject(id){
    return apiCall('http://localhost:4201/user_project/'+id, 'GET', undefined);
  }
  
  export function getProjects() {
    return apiCall('http://localhost:4201/project', 'GET', undefined);
  }

  export function getOneProject(id) {
    return apiCall('http://localhost:4201/project/'+id, 'GET', undefined);
  }
  
  export function createProject(content) {
    return apiCall('http://localhost:4201/project', 'POST', content);
  }

  export function updateOneProject(content, id){
    return apiCall('http://localhost:4201/project/'+id, 'PUT', content, undefined);
  }

  export function assignProject(content, id){
    return apiCall('http://localhost:4201/assign_user/'+id, 'PUT', content, undefined);
  }