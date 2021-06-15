const _ =require('lodash');
const dummy=(blogs)=>{
  return 1
}

const listWithManyBlogs=[
      //    {
      //       title: 'Go To Statement Considered Harmful',
      //       author: 'Edsger W. Dijkstra',
      //       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      //       likes: 5,
      //     },
      //    {
      //       title: 'Go To Statement Considered Harmful',
      //       author: 'Edsger W. Dijkstra',
      //       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      //       likes: 6,
      //     },
      //     {
      //       title: 'Go To Statement Considered Harmful',
      //       author: 'Edsger W. Dijkstra',
      //       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      //       likes: 7,
      //     },
      //     {
      //       title: 'Go To Statement Considered Harmful',
      //       author: 'Edsger W. Dijktra',
      //       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      //       likes: 11,
      //     },
      //     {
      //       title:'Essentialism- the disciplined pursuit',
      //       author:'Greg Mckeown',
      //       url:'abc',
      //       likes:1
      //     }
      ]

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
    return favoriteblog
}

const mostBlogs=(blogs)=>{
  const result=_.countBy(blogs,'author')
  let max=-1
  let obj={};
  for(const [key,val] of Object.entries(result))
  {
    if(val > max)
    {
      max=val
      obj.author=key 
      obj.blogs=val
    }
  }
  // console.log(obj)
  return obj
}

const mostLikes=(blogs)=>{

  const result=_.maxBy(blogs,'likes')
  if(result===undefined)
  {
    return ;
  }
  else
  {
    const send={
      author:result.author,
      likes:result.likes
    }
    console.log(send);
    return send;
  }
}

// mostLikes(listWithManyBlogs);

module.exports={
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}