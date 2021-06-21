import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


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

    updateBlog=jest.fn()
    deleteBlog=jest.fn()

    component=render(
      <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    )

  })

  test('<Blog /> displays blogs\' title and author and does not show url or number of likes by default' ,() => {

    const defaultView=component.container.querySelector('.BlogComponent .before')
    expect(defaultView).toBeDefined()
    console.log(prettyDOM(defaultView))
    const button=component.container.querySelector('button')
    expect(button).toHaveTextContent('view')
    expect(defaultView).toHaveTextContent(`${blog.title} - ${blog.author} view`)

  })

  test('when toggled whole details of the blog are shown',() => {

    const defaultView=component.container.querySelector('.BlogComponent .before')
    const button=defaultView.querySelector('button')
    console.log(prettyDOM(button))
    fireEvent.click(button)
    const afterFiredButton=component.container.querySelector('button')
    const toggledView=component.container.querySelector('.BlogComponent .after')
    expect(toggledView).toBeDefined()
    expect(toggledView).toHaveTextContent(`${blog.url} likes ${blog.likes} like`)
    expect(afterFiredButton).toHaveTextContent('hide')
  })

  test('if like button clicked twice',() => {
    const initialLikes=blog.likes
    const button=component.container.querySelector('button')
    expect(button).toHaveTextContent('view')
    fireEvent.click(button)
    const afterFiredButton=component.container.querySelector('button')
    expect(afterFiredButton).toHaveTextContent('hide')
    const likesButton=component.getByText('like')
    fireEvent.click(likesButton)
    fireEvent.click(likesButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
    expect(updateBlog.mock.calls[0][1].likes).toBe(initialLikes+2)
  })
})

