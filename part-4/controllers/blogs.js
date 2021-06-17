const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User=require('../models/user')

blogsRouter.get('/',async (req, res,next) => {
  const blogs=await Blog
                .find({})
                .populate('user',{username:1,name:1})//populate('user',{username:1,name:1}) for selective population
    res.json(blogs)
  }
)

blogsRouter.get('/:id',async (req, res,next) => {
  const response=await Blog.findById(req.params.id)
  if(response)
  {
    res.status(200).send(response.toJSON())
  }
  else{
    res.status(404).end()
  }
}
)

blogsRouter.post('/',async (req,res,next)=>{

  const user=await User.findOne({username:"pradeep2572"})
  console.log(user)
  const blog=new Blog({
    title:req.body.title,
    author:req.body.author,
    url:req.body.url, 
    likes:req.body.likes || 0,
    user:user._id
  })

  const savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog)
  await user.save()

 res.status(201).json(savedBlog)

})

blogsRouter.delete('/:id',async (req,res,next)=>{
  await Blog.findByIdAndRemove(req.params.id)
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