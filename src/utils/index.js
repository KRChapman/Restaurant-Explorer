// REACT_APP_API_URL +

export async function apiRequest(
  endpoint,request) {

  const response = await fetch( endpoint, {
    ...request,
  //  headers: { ...request.headers, 'Content-Type': 'application/json'}
  });

  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText);
    error.response = response;
    error.status = response.status;
    throw error;
  }

  return response;
}


const isOk = response => response.ok ? response.json() : Promise.reject(new Error('Failed to load data from server'))

export const fetchOK  = () => {
 return fetch('https://api.github.com/orgs/nodejs')
    .then(isOk) // <= Use `isOk` function here
    .then(data => {
      console.log(data) // Prints result from `response.json()`
    })
    .catch(error => console.error(error))
}


//   new Promise(function(resolve, reject) {
//      fetch(url, options).then(function (response) {
//       if (response.status >= 200 && response.status < 300) {
//         return Promise.resolve(response)
//       } else {
//         var error = new Error(response.statusText || response.status)
//         error.response = response
//         return Promise.reject(error)
//       }
//     })
//   })
// export
