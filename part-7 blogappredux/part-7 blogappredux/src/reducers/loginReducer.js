/* eslint-disable */
import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Storage from '../utils/storage'

const reducer = (state=null,action) => {
  switch(action.type) {
    case 'LOGIN' : {
      return action.data
    }
    case 'LOGOUT' : {
      return null
    }
    case 'SET_USER':{
      return action.data
    }
    default : 
      return state
  }
}

//action creators 

export const userLogin = (username,password) => {
  return async dispatch => {
    try{
    const user = await loginService.login({username,password})
    window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setNotification(`${user.name} welcome back!`,'success',5))
    dispatch({
      type:'LOGIN',
      data: user
    })
  }catch(e){
    console.log(e)
     dispatch(setNotification('wrong username/password','error',5))
  }
 }
}

export const userLogout = () => {
  return dispatch => {
    Storage.logoutUser()
    dispatch({
      type:'LOGOUT',
    })
  }
}

export const setUser= (user) => {
  return dispatch => {
    dispatch({
    type:'SET_USER',
    data:user
    })
  }
}

export default reducer