
const notificationReducer=(state='Welcome',action)=>{
    switch(action.type){
      case 'SET_MESSAGE':
        return action.message
      default:
        return state
    }
}

const previousNotifications=[]

export const setMessage=(message,time) => {
  return async dispatch => {
     dispatch({
        type:'SET_MESSAGE',
        message:message
      })

      for(let i=0;i<previousNotifications.length;i++)
      {
        clearTimeout(previousNotifications[i])
      }

      previousNotifications.push(setTimeout(()=>{
        dispatch({
          type:'SET_MESSAGE',
          message:null
        })
      },time*1000)
      )
  }
}


export default notificationReducer