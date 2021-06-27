import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { Form,Button } from 'react-bootstrap'

const BlogForm=({ blogFormRef }) => {

  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const dispatch = useDispatch()

  const handleTitle=(event) => {
    setTitle(event.target.value)
  }

  const handleAuthor=(event) => {
    setAuthor(event.target.value)
  }

  const handleUrl=(event) => {
    setUrl(event.target.value)
  }

  const createBlog=async (event) => {
    event.preventDefault()
    dispatch(addBlog({
      title:title,
      author:author,
      url:url,
    }))
    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={createBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control id="title" type="text" value={title} onChange={handleTitle}/>

          <Form.Label>author</Form.Label>
          <Form.Control id="author" type="text" value={author} onChange={handleAuthor}/>

          <Form.Label>url</Form.Label>
          <Form.Control id="url" type="text" value={url} onChange={handleUrl}/>
        </Form.Group>
        <Button id="create" variant="primary" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm