const listHelper=require('../utils/list_helper')
const _ =require('lodash')

const listWithOneblog=[
                          {
                            title: 'Go To Statement Considered Harmful',
                            author: 'Edsger W. Dijkstra',
                            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                            likes: 5,
                          }
                      ]

const listWithManyBlogs=[
         {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
          },
         {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
          },
          {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 7,
          },
          {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijktra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 11,
          },
          {
            title:'Essentialism- the disciplined pursuit',
            author:'Greg Mckeown',
            url:'abc',
            likes:1
          }
      ]


test('dummy returns one',()=>{
  const blogs=[]
  const result=listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes',()=>{
  test('of empty list is zero',()=>{
    const result=listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  
  test('when list has only one blog equals the likes of that',()=>{
    const result=listHelper.totalLikes(listWithOneblog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right',()=>{
      const result=listHelper.totalLikes(listWithManyBlogs)
      expect(result).toBe(30)
  })

  describe('favorite blog',()=>{
    
    test('of emplty list of blog is empty object',()=>{
      expect(listHelper.favoriteBlog([])).toEqual({})
    })

    test('of list having single blog is that itself',()=>{
      const favoriteblog={
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
      }
      expect(listHelper.favoriteBlog(listWithOneblog)).toEqual(favoriteblog)
    })

    test('of list having many blogs is right',()=>{

      const favoriteblog= {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijktra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 11,
          }

      expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(favoriteblog)
    })
  })
})

describe('most Blogs',()=>{
  test('of empty list is empty object',()=>{
    expect([]).toEqual([])
  })

  test('of list having single blog is that itself',()=>{

     const result={
            author: 'Edsger W. Dijkstra',
            blogs:1
      }
    expect(listHelper.mostBlogs(listWithOneblog)).toEqual(result)
  })

  test('of list having many blogs is right',()=>{
    const result={
      author: 'Edsger W. Dijkstra',
            blogs:3
    }
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual(result)
  })
})

describe('mostLikes',()=>{
  test('of empty list',()=>{
    expect([]).toEqual([])
  })

  test('of list having single blog is itself',()=>{
    const result={
            author: 'Edsger W. Dijkstra',
            likes:5
      }
    expect(listHelper.mostLikes(listWithOneblog)).toEqual(result)
  })

  test('of list having many blogs is right',()=>{
    const result={
           author: 'Edsger W. Dijktra',
            likes:11
    }
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual(result)
  })
})
