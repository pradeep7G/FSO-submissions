
describe('Blog app',function(){
  beforeEach(function(){
    cy.request('POST','http://localhost:3001/api/testing/reset')
    const user={
      name:'Pradeep',
      username:'pradeep2572',
      password:'curious'
    }
    cy.request('POST','http://localhost:3001/api/users',user)
    cy.request('POST','http://localhost:3001/api/users',{
      username:'Google',
      name:'Alphabet',
      password:'google'
    })
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown',function(){
    cy.contains('Login to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('button').contains('login')
  })

  describe('Login',function(){
    it('succeeds with correct credentials',function(){
      cy.get('#username').type('pradeep2572')
      cy.get('#password').type('curious')
      cy.get('#login-button').click()
      cy.contains('Blogs')
      cy.contains('Pradeep logged-in')
    })

    it('fails with invalid credentials',function(){
      cy.get('#username').type('pradeep2572')
      cy.get('#password').type('wrongPass')
      cy.get('#login-button').click()
      cy.get('.error').should('contain','wrong username/password')
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })
  describe('when logged in',function(){
    beforeEach(function(){
      cy.login({ username:'pradeep2572',password:'curious' })
    })

    it('A blog can be created',function(){
      const blog={
        title:'Deep work',
        author:'Port man',
        url:'deepwork.in',
        likes:7
      }
      cy.contains('create new blog').click()
      cy.get('#title').type(`${blog.title}`)
      cy.get('#author').type(`${blog.author}`)
      cy.get('#url').type(`${blog.url}`)
      cy.get('#create').click()
      const user=JSON.parse(localStorage.getItem('loggedBlogAppUser'))
      cy.contains(`${blog.author}`)
      cy.contains(`${blog.author}`)
    })
  })

  describe('when several blogs created by many people exist', function(){

    beforeEach(function(){
      cy.login({ username:'pradeep2572',password:'curious' })
      const blog={
        title:'Deep work',
        author:'Port man',
        url:'deepwork.in',
        likes:7
      }
      cy.createBlog(blog)
      cy.contains('logout').click()
      cy.login({ username:'Google',password:'google' })
      cy.createBlog({ author:'Jhon doe',title:'test1',url:'http://abc.com' })
      cy.createBlog({ author:'Jhon doe',title:'test2',url:'http://abc.com' })

      cy.contains('test1').parent().parent().as('blog1')
      cy.contains('test2').parent().parent().as('blog2')
      cy.contains('Deep work').parent().parent().as('blog3')
      cy.visit('http://localhost:3000/')
    })

    it('user can like a blog',function(){
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('likes 1')
    })

    it('a blog can be deleted only by the user who created it',function(){
      cy.get('@blog1').contains('view').click()
      cy.get('@blog1').contains('remove').click()
      cy.get('home').should('not.contain','test1')

      cy.get('home').contains('view').click()
      cy.get('home').contains('not.contain','remove')
    })

    it('blog with most likes being first',function(){
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes 3')
        cy.wrap(blogs[1]).contains('likes 2')
        cy.wrap(blogs[2]).contains('likes 1')
      })
    })
  })


})