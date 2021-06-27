import  blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state=[],action) => {
  switch(action.type) {
  case 'NEW_BLOG':{
    return state.concat(action.data)
  }
  case 'INIT_BLOGS':{
    return action.data
  }
  default:
    return state
  }
}

//action creators
export const initializeBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    const blogs= response.sort((a,b) => b.likes-a.likes)
    dispatch({
      type:'INIT_BLOGS',
      data:blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.create(blog)
    dispatch({
      type:'NEW_BLOG',
      data:response
    })
  }
}

export const likeBlog = (LikedBlog) => {
  return async dispatch => {
    try{
      await blogService.update(LikedBlog)
      const response = await blogService.getAll()
      const blogs= response.sort((a,b) => b.likes-a.likes)
      dispatch({
        type:'INIT_BLOGS',
        data:blogs
      })
    }catch(exception){
      console.log(exception)
    }
  }
}

export const removeBlog = (blogToRemove) => {
  return async dispatch => {
    const ok=window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if(ok){
      try{
        await blogService.remove(blogToRemove.id)
        dispatch(initializeBlogs())
      }catch(e){
        console.log(e)
      }
    }
  }
}

export default reducer