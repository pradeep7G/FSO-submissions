const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const Blog=require('../models/blog')
const User=require('../models/user')
const helper=require('./test_helper')
const bcrypt=require('bcrypt')

const api=supertest(app)
jest.setTimeout(10000)
describe('when initlal blogs are atleast one',()=>{
  beforeEach(async ()=>{
  
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  
  })
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

describe('a valid user',()=>{
  
  beforeEach(async ()=>{
       await Blog.deleteMany({})
       await User.deleteMany({})
        const newUser={
        username:"JhonforIntegrationTest",
        name:"Jhon",
        password:"testsTDD"
      }
     const response = await api
        .post('/api/users')
        .send(newUser)
  })

  test(' can be added',async ()=>{

      await User.deleteMany({})
      await Blog.deleteMany({})

      const newUser={
        username:"JhonforIntegrationTest",
        name:"Jhon",
        password:"testsTDD"
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type',/application\/json/)

  })

  test('can log in',async ()=>{
    const user={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }

    const response=await api
      .post('/api/login')
      .send(user)
      .expect(200)
    })

  test('can post valid blogs ',async ()=>{
  
     const user={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }

    const response=await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const blog={
      title:'curiosity perseverence',
      author:'Nasa',
      url:'www.nasa.com/',
      like:10000
    }
    const blogsAtStart=await helper.blogsInDb()
    const token=response.body.token
    await api
      .post('/api/blogs')
      .set('Authorization',`bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type',/application\/json/)
  
    const blogsAtEnd=await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length+1)
    
    const contents=blogsAtEnd.map(blog => blog.title)
  
    expect(contents).toContain(
      'curiosity perseverence'
    )
  
  })

  test('an invalid blog post fails with proper status code and error message if token is not provided',async ()=>{
     const user={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }

    const response=await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const blog={
      title:'curiosity perseverence',
      author:'Nasa',
      url:'www.nasa.com/',
      like:10000
    }
    const blogsAtStart=await helper.blogsInDb()
    const token=response.body.token
    await api
      .post('/api/blogs')
      .set('Authorization',``)
      .send(blog)
      .expect(401)
      .expect('Content-Type',/application\/json/)
  
    const blogsAtEnd=await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    
    const contents=blogsAtEnd.map(blog => blog.title)
  
    expect(contents).not.toContain(
      'curiosity perseverence'
    )
  })
  
  test('if likes property undefined , likes value set to zero',async ()=>{
    
     const user={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }

    const response=await api
      .post('/api/login')
      .send(user)
      .expect(200)

      const blog={
                title:'Umbrella academy',
                author:'reginald hargreeves',
                url:'www.UA.com/'
      }
    const blogsAtStart=await helper.blogsInDb()
    const token=response.body.token
    const result=await api
                  .post('/api/blogs')
                  .set('Authorization',`bearer ${token}`)
                  .send(blog)
                  .expect(201)
                  .expect('Content-Type',/application\/json/)
  
    const blogsAtEnd=await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length+1)
    expect(result.body.likes).toBe(0)
  })
  
  test('title and url are required',async ()=>{

    const blog={
      author:'morgan stanley',
      likes:101
    }

    const user={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }

    const response=await api
                    .post('/api/login')
                    .send(user)
                    .expect(200)

    const token=response.body.token
    blogsAtStart=await helper.blogsInDb()
    await api
           .post('/api/blogs')
           .set('Authorization',`bearer ${token}`)
           .send(blog)
           .expect(400)
    const blogsAtEnd=await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('accessing a specific blog',()=>{

  beforeEach(async ()=>{
       await Blog.deleteMany({})
       await User.deleteMany({})
        const newUser={
        username:"JhonforIntegrationTest",
        name:"Jhon",
        password:"testsTDD"
      }
     const response = await api
        .post('/api/users')
        .send(newUser)

        const blog={
      title:'curiosity perseverence',
      author:'Nasa',
      url:'www.nasa.com/',
      like:10000
    }

    const user={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }

    const result=await api
                    .post('/api/login')
                    .send(user)
                    .expect(200)

    const token=result.body.token
                     await api
                      .post('/api/blogs')
                      .set('Authorization',`bearer ${token}`)
                      .send(blog)
                      .expect(201)
                      .expect('Content-Type',/application\/json/)
      
  })

  test('a specific blog can be viewed',async ()=>{
    const credentials={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }

    const user=await (await User.findOne({username:credentials.username}))
    const blogs=user.blogs
    const blogToView=blogs[0]
    const resultedBlog=await api
                        .get(`/api/blogs/${blogToView}`)
                        .expect(200)
                        .expect('Content-Type',/application\/json/)
  })

})

describe('deleting a blog',()=>{

  beforeEach(async ()=>{
       await Blog.deleteMany({})
       await User.deleteMany({})
        const newUser={
        username:"JhonforIntegrationTest",
        name:"Jhon",
        password:"testsTDD"
      }
     const response = await api
        .post('/api/users')
        .send(newUser)
  })
  
  test('a valid blog can be deleted',async ()=>{
    const user={
      username:"JhonforIntegrationTest",
      password:"testsTDD"
    }
    const response=await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const blog={
                    title:'curiosity perseverence',
                    author:'Nasa',
                    url:'www.nasa.com/',
                    like:10000
               }
  const token=response.body.token
  const savedBlog=await api
                  .post('/api/blogs')
                  .set('Authorization',`bearer ${token}`)
                  .send(blog)
                  .expect(201)
                  .expect('Content-Type',/application\/json/)
               
    const blogsAtStart=await helper.blogsInDb()
    const savedBlogId=savedBlog.body.id.toString()
    await api
       .delete(`/api/blogs/${savedBlogId}`)
       .set('Authorization',`bearer ${token}`)
       .expect(204)
  
    const blogsAtEnd=await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length-1)
  
    const contents=blogsAtEnd.map(blog => blog.title)
  
    expect(contents).not.toContain(savedBlog.body.title)
  
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
