const handleErrors = function(response){
  if(!response.ok){
    throw response
  }
  return response
}

export function handleUnauthorized(response){
  if(response.status == 401){
    response.json().then(json =>{
      this.context.alert(json.error)
    })
  } else throw response
}

export default handleErrors;
