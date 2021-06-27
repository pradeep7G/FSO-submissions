import blogs from '../services/blogs'
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
  case 'COMMENT_BLOG':{
    return state.map(blog => blog.id===action.data.id ? action.data.id :blog)
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

export const commentBlog = (blogToComment,comment) => {
  return async dispatch => {
    const id=blogToComment.id
    try{
      const updatedBlog=await blogService.postComment(id,{ comment })
      dispatch({
        type:'COMMENT_BLOG',
        data:updatedBlog
      })
    }catch(e){
      return Promise.reject()
    }
  }
}


export default reducer