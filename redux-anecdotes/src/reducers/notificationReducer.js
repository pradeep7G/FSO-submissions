
const notificationReducer=(state='Welcome',action)=>{
    switch(action.type){
      case 'SET_MESSAGE':
        return action.message
      default:
        return state
    }
}

export const setMessage=(message,time) => {
  return async dispatch => {
     dispatch({
        type:'SET_MESSAGE',
        message:message
      })

      setTimeout(()=>{
        dispatch({
          type:'SET_MESSAGE',
          message:null
        })
      },time*1000)
  }
}


export default notificationReducer