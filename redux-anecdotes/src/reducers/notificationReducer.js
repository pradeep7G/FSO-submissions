
const notificationReducer=(state='Welcome',action)=>{
    switch(action.type){
      case 'SET_MESSAGE':
        return action.message
      case 'RESET_MESSAGE':
        return null
      default:
        return state
    }
}

export const setMessage=message => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}

export const resetMessage=() => {
  return {
    type: 'RESET_MESSAGE',
  }
}

export default notificationReducer