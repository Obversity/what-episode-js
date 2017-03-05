import handleErrors from './HandleErrors';

//
//  The goal here is to provide some consistency and more natural feeling error handling
//  to the 'fetch' api
//

const host = process.env.API_URL

function doFetch(path, method, body, token = null){
  let headers = { 'Content-Type': 'application/json' }
  if(token) headers['Authorization'] = 'Bearer ' + token
  let fetchArgs = { method, headers }
  let url = host + '/' + path

  if(method === 'GET'){
    url = url + '?' + urlEncodeObject(body)
  } else {
    fetchArgs['body'] = JSON.stringify(body)
  }

  return fetch(url, fetchArgs).then(handleErrors)
}

// turn { key: "value" } into "key=value"
function urlEncodeObject(object){
  return Object.keys(object).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
  }).join('&')
}

export const put    = (path, body={}, token=null) => doFetch(path, 'PUT', body, token);
export const del    = (path, body={}, token=null) => doFetch(path, 'DELETE', body, token);
export const patch  = (path, body={}, token=null) => doFetch(path, 'PATCH', body, token);
export const get    = (path, body={}, token=null) => doFetch(path, 'GET', body, token);
export const post   = (path, body={}, token=null) => doFetch(path, 'POST', body, token);
