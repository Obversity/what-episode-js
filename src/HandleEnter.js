export default function handleEnter(callback, escapeCallback = null){
  return function(event) {
    if(event.key === 'Enter') {
      callback()
    }
    if(event.key === 'Escape' && escapeCallback) {
      escapeCallback()
    }
  }
}
