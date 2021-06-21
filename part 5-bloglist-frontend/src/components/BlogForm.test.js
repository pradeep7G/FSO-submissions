import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('form calls the event handler with right details when new blog is created',() => {
  const createBlog=jest.fn()
  const component=render(
    <BlogForm createBlog={createBlog} />
  )
  const title=component.container.querySelector('#title')
  const author=component.container.querySelector('#author')
  const url=component.container.querySelector('#url')
  const form=component.container.querySelector('form')
  const button=component.container.querySelector('button')

  fireEvent.change(title,{
    target:{ value: 'Test 1' }
  })
  fireEvent.change(author,{
    target:{ value:'pradeep' }
  })
  fireEvent.change(url,{
    target:{ value:'abc.com' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test 1')
  expect(createBlog.mock.calls[0][0].author).toBe('pradeep')
  expect(createBlog.mock.calls[0][0].url).toBe('abc.com')
})