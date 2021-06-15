const dummy=(blogs)=>{
  return 1
}

const totalLikes=(blogs)=>{
  let result=0
  blogs.forEach(blog => { result=(result + (blog.likes)) })
  return result
}

const favoriteBlog=(blogs)=>{
    const favoriteblog=blogs.reduce((acc,New)=>{
        if(acc.likes > New.likes)
        {
          return acc 
        }
        else
        {
          return New
        }
    },{})
    // console.log(favoriteblog)
    return favoriteblog;
}

module.exports={
  dummy,
  totalLikes,
  favoriteBlog
}