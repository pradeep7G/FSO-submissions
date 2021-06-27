import axios from 'axios'
const baseUrl = '/api/blogs'
let token=null
const setToken=newToken => {
  token=`bearer ${newToken}`
}

const getConfig=() => {
  return {
    headers:{
      Authorization:token
    }
  }
}

const getAll = async () => {
  const response =await axios.get(baseUrl)
  return response.data
}

const getOne=async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const postComment =async (id,message) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,message,getConfig())
  return response.data
}

const create=async (newObject) => {

  const response=await axios.post(baseUrl,newObject,getConfig())
  return response.data
}

const update=async (blog) => {
  const response=await axios.put(`${baseUrl}/${blog.id}`,blog)
  return response.data
}

const remove=async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`,getConfig())
  return response.data
}
export default { getAll,getOne,create,update,setToken,remove,postComment }