import handleErrors from './HandleErrors';

//
//  The goal here is to provide some consistency and more natural feeling error handling
//  to the 'fetch' api
//

function doFetch(url, method, body, token = null){
  let headers = { 'Content-Type': 'application/json' }
  if(token) headers['Authorization'] = 'Bearer ' + token
  let fetchArgs = { method, headers }

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

export const put    = (url, body={}, token=null) => doFetch(url, 'PUT', body, token);
export const del    = (url, body={}, token=null) => doFetch(url, 'DELETE', body, token);
export const patch  = (url, body={}, token=null) => doFetch(url, 'PATCH', body, token);
export const get    = (url, body={}, token=null) => doFetch(url, 'GET', body, token);
export const post   = (url, body={}, token=null) => doFetch(url, 'POST', body, token);
