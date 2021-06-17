const logger=require('./logger')
const jwt=require('jsonwebtoken')
const User=require('../models/user')

const unknownEndpoint=(req,res)=>{
  res.status(404).send({
    error:'unknown endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError')
  {
    return response.status(400).json({ error:error.message })
  }
  else if(error.name==='JsonWebTokenError'){
    return response.status(401).json({
      error:'invalid token'
    })
  }
  else if(error.name === 'TokenExpiredError'){
    return response.status(401).json({
      error:'token expired'
    })
  }
  next(error)
}

const tokenExtractor=(request,response,next) => {
  const authorization=request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token=authorization.substring(7)
  }
  next()
}

const userExtractor=async (req,res,next)=>{
  // console.log(req.token)
  if(!req.token)
  {
    return next()
  }
  const decodedToken=jwt.verify(req.token,process.env.SECRET)
  if(!req.token || !decodedToken)
  {
    return res.status(401).json({error:'token is missing or invalid'})
  }
  const user=await User.findById(decodedToken.id)
  if(user)
  {
    req.user=user
  }
  next()
}

module.exports={
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor
}