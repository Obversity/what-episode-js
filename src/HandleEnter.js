export default function handleEnter(callback, escapeCallback = null){
  return function(event) {
    if(event.key === 'Enter') {
      event.preventDefault()
      callback()
    }
    if(event.key === 'Escape' && escapeCallback) {
      event.preventDefault()
      escapeCallback()
    }
  }
}
