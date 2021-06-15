const dummy=(blogs)=>{
  return 1
}

const totalLikes=(blogs)=>{
  let result=0
  blogs.forEach(blog => { result=(result + (blog.likes)) })
  return result
}

module.exports={
  dummy,
  totalLikes
}