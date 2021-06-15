const listHelper=require('../utils/list_helper')

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
    const listWithOneblog=[
     {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
    ]
    const result=listHelper.totalLikes(listWithOneblog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right',()=>{
      const listWithManyBlogs=[
         {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          },
         {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          }
      ]
      const result=listHelper.totalLikes(listWithManyBlogs)
      expect(result).toBe(15)
  })
})