const handleErrors = function(response){
  if(!response.ok){
    throw response
  }
  return response
}

export default handleErrors;
