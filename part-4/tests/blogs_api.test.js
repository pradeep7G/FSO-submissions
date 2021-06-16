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

test('valid blogs can be posted',async ()=>{
  await api
  .post('/api/blogs')
  .send(blog)
  .expect(201)
  .expect('Content-Type',/application\/json/)
})

afterAll(()=>{
  mongoose.connection.close()
})
