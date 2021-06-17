const logger=require('./logger')

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

const tokenExtractor=(req,res,next)=>{
    const authorization=req.get('authorization')
    console.log('hella fellas',authorization.substring(7))
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
     req.token=authorization.substring(7)
     console.log(authorization.substring(7),req.token)
    }
    next()
}

module.exports={
  errorHandler,
  unknownEndpoint,
  tokenExtractor
}