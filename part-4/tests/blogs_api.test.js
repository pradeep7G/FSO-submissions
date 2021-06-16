const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const Blog=require('../models/blog')
const helper=require('./test_helper')

const api=supertest(app)

beforeEach(async ()=>{
  await Blog.deleteMany({})

  const blogObjects=helper.initialBlogs
                            .map(blog=>new Blog(blog))
  
 const promiseArray=blogObjects.map(blog => blog.save())

 await Promise.all(promiseArray)

})

test('all blogs are returned in json format',async ()=>{
  
   const response=await api.get('/api/blogs').expect('Content-Type',/application\/json/)
   expect(response.body)
   .toHaveLength(helper.initialBlogs.length)

})

test('unique identifier of blog posts is named "id" ',async ()=>{
    const response=await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('valid blogs can be posted',async ()=>{

  const blog={
    title:'curiosity perseverence',
    author:'Nasa',
    url:'www.nasa.com/',
    like:10000
  }
  
  await api
  .post('/api/blogs')
  .send(blog)
  .expect(201)
  .expect('Content-Type',/application\/json/)

  const blogs=await Blog.find({})
  const blogsAtEnd=blogs.map(blog => blog.toJSON())
  
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  
  const contents=blogsAtEnd.map(blog => blog.title)

  expect(contents).toContain(
    'curiosity perseverence'
  )

})

test('if likes property undefined , likes value set to zero',async ()=>{
  
  const blog={
            title:'Umbrella academy',
            author:'reginald hargreeves',
            url:'www.UA.com/'
  }

  const response=await api.post('/api/blogs').send(blog).expect(201)
  expect(response.body.likes).toBe(0)
})

test('title and url are required',async ()=>{
  const blog={
    author:'morgan stanley',
    likes:101
  }

  await api.post('/api/blogs').send(blog).expect(400)

  const blogsAtEnd=await Blog.find({})

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('a valid blog can be deleted',async ()=>{

  const blogsAtStart=await helper.blogsInDb()
  const blogToDelete=blogsAtStart[0]

  await api
     .delete(`/api/blogs/${blogToDelete.id}`)
     .expect(204)

  const blogsAtEnd=await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)

  const contents=blogsAtEnd.map(blog => blog.title)

  expect(contents).not.toContain(blogToDelete.title)

})


afterAll(()=>{
  mongoose.connection.close()
})
