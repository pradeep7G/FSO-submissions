const config=require('./utils/config')
const express=require('express')
const app=express()
const cors=require('cors')
const blogsRouter=require('./controllers/blogs')
const mongoose=require('mongoose')
const logger=require('./utils/logger')

logger.info('connecting to ',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(result => {
  logger.info('connected to Mongo DB')
})
.catch(error => {
  logger.error(`error connecting to mongo db`,error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogsRouter)

module.exports=app