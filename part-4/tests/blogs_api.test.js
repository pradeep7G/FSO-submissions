const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const Blog=require('../models/blog')
const User=require('../models/user')
const helper=require('./test_helper')
const bcrypt=require('bcrypt')

const api=supertest(app)

beforeEach(async ()=>{

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

describe('when initlal blogs are atleast one',()=>{
  test('all blogs are returned in json format',async ()=>{
    
     const response=await api
                    .get('/api/blogs')
                    .expect('Content-Type',/application\/json/)
  
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  
  })
  
  test('unique identifier of blog posts is named "id" ',async ()=>{
      const response=await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
  })

})

describe('additon of a new blog',()=>{
  
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
  
    const blogsAtEnd=await helper.blogsInDb()
    
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

})

describe('accessing a specific blog',()=>{

  test('a specific blog can be viewed',async ()=>{
    const blogsAtStart=await helper.blogsInDb()
    const blogToView=blogsAtStart[0]

    const resultedBlog=await api
                        .get(`/api/blogs/${blogToView.id}`)
                        .expect(200)
                        .expect('Content-Type',/application\/json/)

    const processedBlog=JSON.parse(JSON.stringify(blogToView))

    expect(resultedBlog.body).toEqual(processedBlog)
  })

})

describe('deleting a blog',()=>{
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

})

describe('when there is one user in db',()=>{
  beforeEach(async ()=>{
    await User.deleteMany({})
    const passwordHash=await bcrypt.hash('secret',10)
    const user=new User({
      username:'root',
      name:"Admin",
      passwordHash
    })

    await user.save()

  })

  test('creation succeeds with a fresh username',async ()=>{

      const usersAtStart=await helper.usersInDb()

      const newUser={
         username:"matt",
         name:"matt Damon",
         password:"password"
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type',/application\/json/)

      const usersAtEnd=await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

      const usernames=usersAtEnd.map(user => user.username)

      expect(usernames).toContain(newUser.username)

  })

  test('creation fails with proper status code and message if username is already taken',async ()=>{
    const usersAtStart=await helper.usersInDb()

    const newUser={
      username:'root',
      name:'Admir',
      password:"something"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd=await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper status code if username or password is invalid',async ()=>{
    const usersAtStart=await helper.usersInDb()

    const newUser={
      username:"paul",
     name:"duplicaton",
    //  password:"pass"
    }

     const result=await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(401)
                    .expect('Content-Type',/application\/json/)

    expect(result.body.error).toContain('invalid username or password')

    const usersAtEnd=await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

})

afterAll(()=>{
  mongoose.connection.close()
})
