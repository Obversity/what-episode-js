const handleErrors = function(response){
  if(!response.ok){
    throw response
  }
  return response
}

export function handleUnauthorized(response){
  response.json().then(json =>{
    this.context.alert(json.error)
  })
}

export default handleErrors;
