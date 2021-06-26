import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const other={
  own:true,
  handleRemove:() => {},
  handleLike: () => {}
}

describe('<Blog />',() => {
  let component
  const blog={
    title:'#Test 1',
    author:'pradeep',
    url:'abc.com',
    likes:7
  }
  let updateBlog,deleteBlog

  beforeEach(() => {

    component=render(
      <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    )

  })

  test('<Blog /> displays blogs\' title and author and does not show url or number of likes by default' ,() => {

    const blog={
      author:'Ron jeffries',
      title:'you are not gonna need it!',
      url:'abc.com',
      likes:3,
    }

    const component=render(
      <Blog blog={blog} {...other} />
    )

    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).not.toHaveTextContent(blog.url)

  })

  test('when toggled whole details of the blog are shown',() => {

    const blog={
      author:'Ron jeffries',
      title:'you are not gonna need it!',
      url:'abc.com',
      likes:3,
      user:{
        name:'John surez'
      }
    }

    const component=render(
      <Blog blog={blog} {...other} />
    )

    const viewButton=component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)

  })

  test('if like button clicked twice',() => {

    const blog={
      author:'Ron jeffries',
      title:'you are not gonna need it!',
      url:'abc.com',
      likes:3,
      id:1,
      user:{
        name:'John surez'
      }
    }

    other.handleLike=jest.fn()

    const component=render(
      <Blog blog={blog} {...other} />
    )

    const viewButton=component.getByText('like')
    fireEvent.click(viewButton)

    const likeButton=component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(other.handleLike.mock.calls.length).toBe(2)
  })
})

