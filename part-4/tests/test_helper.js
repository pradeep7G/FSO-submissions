const Blog=require('../models/blog')

const initialBlogs=[
  {
    title:'Essentialism-The disciplined pursuit of pursuit',
    author:'Greg Mckeown',
    url:'www.GregMckeown.com/',
    likes:3000
  },
  {
    title:'Another Interview Preperation guide',
    author:'yin yaan',
    url:'www.facebook.com/yinyaan',
    likes:255
  }
]

module.exports={
  initialBlogs
}