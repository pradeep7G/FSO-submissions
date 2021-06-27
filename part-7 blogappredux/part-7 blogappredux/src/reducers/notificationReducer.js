/* eslint-disable */
const notificationReducer = (state={message:null,type:null},action) => {
  switch(action.type) {
    case 'SET_NOTIF':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (message,type,time) => {
  return async dispatch => {
    dispatch({
      type:'SET_NOTIF',
      notification:{message,type}
    })

    setTimeout(()=>{
      dispatch({
        type:'SET_NOTIF',
        notification:{message:null,type:null}
      })
    },time*1000)
  }
}

export default notificationReducer