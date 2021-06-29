const config=require('./utils/config')
const express=require('express')
require('express-async-errors')
const app=express()
const cors=require('cors')
const blogsRouter=require('./controllers/blogs')
const usersRouter=require('./controllers/users')
const loginRouter=require('./controllers/login')
const mongoose=require('mongoose')
const logger=require('./utils/logger')
const middleware=require('./utils/middleware')

logger.info('connecting to ',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(result => {
  logger.info('connected to Mongo DB')
})
.catch(error => {
  logger.error(`error connecting to mongo db`,error.message)
})
app.use(express.static('build'))
app.use(middleware.tokenExtractor)

app.use(cors())
app.use(express.json())

app.use('/api/blogs',middleware.userExtractor,blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

if(process.env.NODE_ENV==='test')
{
  const testingRouter=require('./controllers/router')
  app.use('/api/testing',testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports=app