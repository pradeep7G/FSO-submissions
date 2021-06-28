import  blogService from '../services/blogs'

const reducer = (state=[],action) => {
  switch(action.type) {
  case 'INIT_BLOGS':{
    return action.data
  }
  case 'NEW_BLOG':{
    return [...state,action.data]
  }
  case 'LIKE_BLOG' :{
    const likedBlog=action.data
    return state.map(b => b.id === likedBlog.id ? likedBlog:b)
  }
  case 'REMOVE_BLOG' :{
    const id=action.id
    return state.filter(b => b.id!==id)
  }
  case 'COMMENT_BLOG':{
    return state.map(blog => blog.id===action.data.id ? action.data :blog)
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
      const updatedBlog=await blogService.update(LikedBlog)
      dispatch({
        type:'LIKE_BLOG',
        data:updatedBlog
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
        dispatch({
          type:'REMOVE_BLOG',
          data:blogToRemove.id
        })
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
      return Promise.reject(e)
    }
  }
}

export default reducer