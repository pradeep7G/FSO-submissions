const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')
const jwt =require('jsonwebtoken')
blogsRouter.get('/',async (req, res,next) => {
  const blogs=await Blog
                .find({})
                .populate('user',{username:1,name:1})//populate('user',{username:1,name:1}) for selective population)
    res.json(blogs)
  }
)

blogsRouter.get('/:id',async (req, res,next) => {
  const response=await Blog
                        .findById(req.params.id)
                        .populate('user',{username:1,name:1})
  if(response)
  {
    res.status(200).send(response.toJSON())
  }
  else{
    res.status(404).end()
  }
}
)

// blogsRouter.get('/blogs/:id',async (req, res,next) => {
//   const response=await Blog
//                         .findById(req.params.id)
//                         .populate('user',{username:1,name:1})
//   if(response)
//   {
//     res.status(200).send(response.toJSON())
//   }
//   else{
//     res.status(404).end()
//   }
// }
// )

blogsRouter.post('/:id/comments',async (req,res,next) => {
  const id=req.params.id
  const comment=req.body.comment
  if(!req.user || !req.token)
  {
    return res.status(401).json({error:'token is missing or invalid'})
  }
  const blog=await Blog
                    .findById(id)
  blog.comments.push(comment)
  const updatedBlog=await blog.save()
  res.status(200).json(updatedBlog)
})

blogsRouter.post('/',async (req,res,next)=>{

  const body=req.body
  const user=req.user
  if(!req.user || !req.token)
  {
    return res.status(401).json({error:'token is missing or invalid'})
  }
  const blog=new Blog({
    title:body.title,
    author:body.author,
    url:body.url, 
    likes:body.likes || 0,
    user:user._id
  })

  const savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog)
  await user.save()

 res.status(201).json(savedBlog)

})

blogsRouter.delete('/:id',async (req,res,next)=>{
  
  const user=req.user
  const blogToDelete=await Blog.findById(req.params.id)
  if(!blogToDelete || !user || blogToDelete.user.toString() !== user._id.toString())
  {
    return  res.status(401).json({error:'unauthorised!! permission denied :( only the creator of the blog post can delete the blog'})
  }
  await Blog.findByIdAndRemove(req.params.id)
  user.blogs=user.blogs.filter(blog => blog!==blogToDelete._id)
  await user.save()
  res.status(204).end()
})

blogsRouter.put('/:id',async (req,res,next)=>{

  const body=req.body
  const blog={
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
  }

  const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,blog,{new:true})
  res.json(updatedBlog)

})

module.exports=blogsRouter