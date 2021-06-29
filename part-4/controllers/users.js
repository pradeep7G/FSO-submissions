const usersRouter=require('express').Router()
const bcrypt=require('bcrypt')
const User=require('../models/user')

usersRouter.get('/',async (req,res)=>{
  const users = await User
                  .find({})
                  .populate('blogs',{title:1,author:1,url:1,comments:1,likes:1})
  res.json(users)
})

usersRouter.get('/:id',async (req,res)=>{
  const user = await User
  .findById(req.params.id)
  .populate('blogs',{title:1,author:1,url:1,likes:1})
  res.json(user)
})

usersRouter.post('/',async (req,res)=>{
  const body=req.body
  if(body.username===undefined || body.password===undefined)
  {
     return res.status(401).json({
       error:'invalid username or password, Both username and password must be given'
     })
  }
  else if(body.username.length<3 || body.password.length<3)
  {
     return res.status(401).json({
       error:'invalid username or password Both username and password must be atleast 3 characters long'
     })
  }

  const saltRounds=10
  const passwordHash=await bcrypt.hash(body.password,saltRounds)

  const user=new User({
    username:body.username,
    name:body.name,
    passwordHash,
  })

  const savedUser=await user.save()

  res.json(savedUser)

})

module.exports=usersRouter