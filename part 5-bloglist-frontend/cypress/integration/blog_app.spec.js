const { func } = require('prop-types')

describe('Blog app',function(){
  beforeEach(function(){
    cy.request('POST','http://localhost:3001/api/testing/reset')
    const user={
      name:'Pradeep',
      username:'pradeep2572',
      password:'curious'
    }
    cy.request('POST','http://localhost:3001/api/users',user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown',function(){
    cy.contains('Log in to application')
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
      cy.get('.error').should('contain','wrong username or password')
        .and('have.css','color','rgb(255, 0, 0)')
        .and('have.css','border-style','solid')
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
      cy.get('#beforeToggle').click()
      cy.get('#title').type(`${blog.title}`)
      cy.get('#author').type(`${blog.author}`)
      cy.get('#url').type(`${blog.url}`)
      cy.get('#create').click()
      const user=JSON.parse(localStorage.getItem('loggedBlogAppUser'))
      console.log(user)
      cy.get('.error').should('contain',`a new blog ${blog.title} by ${user.name} added`)
        .and('have.css','color','rgb(0, 128, 0)')
        .and('have.css','border-style','solid')
      cy.contains(`${blog.title} - ${blog.author}`)
    })
  })

  describe('when there is alteast a blog', function(){

    beforeEach(function(){
      cy.login({ username:'pradeep2572',password:'curious' })
      const blog={
        title:'Deep work',
        author:'Port man',
        url:'deepwork.in',
        likes:7
      }
      cy.createBlog(blog)
      cy.visit('http://localhost:3000/')
    })

    it('user can like a blog',function(){

      cy.contains('Deep work').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('Deep work').parent().find('#like').as('theLikeButton')
      cy.get('@theLikeButton').click()
      cy.get('@theLikeButton').parent().should('contain','likes 8')
    })

    it('a blog can be deleted only by the user who created it',function(){
      cy.contains('Deep work').parent().find('#view').as('theButton')
      cy.get('@theButton').click()
      cy.contains('Deep work').parent().find('#remove').as('theRemove')
      cy.get('@theRemove').click()
      cy.get('html').should('not.contain','Deep work')
    })

    it('other users cannot delete the blog',function(){
      const user={
        name:'user2',
        username:'user2',
        password:'user2'
      }
      cy.get('#logout').click()
      cy.request('POST','http://localhost:3001/api/users',user)
      cy.visit('http://localhost:3000')
      cy.get('#username').type('user2')
      cy.get('#password').type('user2')
      cy.get('#login-button').click()
      cy.contains('Deep work').parent().find('#view').as('theButton')
      cy.get('@theButton').click()
      cy.contains('Deep work').parent().find('#remove').as('theRemove')
      cy.get('@theRemove').click()
      cy.get('html').should('contain','Deep work')
    })

    it('blog with most likes being first',function(){

    })
  })


})