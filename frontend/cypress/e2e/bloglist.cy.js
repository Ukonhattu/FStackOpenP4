describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
    //create a user to backend
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.contains('Please Log In')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create Blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click()

      cy.contains('Test Blog')
    })
    it('A blog can be liked', function() {
      cy.contains('Create Blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click()
      cy.contains('view').click()
      cy.contains('Like').click().then(() => {
        cy.reload()
      })
      cy.contains('1')
    })
    it('A blog can be deleted', function() {
      cy.contains('Create Blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click()
      cy.contains('view').click()
      cy.contains('Remove').click().then(() => {
        cy.reload()
      })
      cy.contains('Test Blog').should('not.exist')
    })
  })

  it('Other user cannot delete other users blog', function() {
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()
    cy.contains('Create Blog').click()
    cy.get('#title').type('Test Blog')
    cy.get('#author').type('Test Author')
    cy.get('#url').type('http://testurl.com')
    cy.get('#create-button').click()
    cy.contains('Logout').click()
    const user = {
      name: 'Test User2',
      username: 'testuser2',
      password: 'testpassword2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.get('#username').type('testuser2')
    cy.get('#password').type('testpassword2')
    cy.get('#login-button').click()
    cy.contains('view').click()
    cy.contains('Remove').should('not.exist')
  })

  it('Blogs are ordered by likes', function() {
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()
    cy.contains('Create Blog').click()
    cy.get('#title').type('Test Blog1')
    cy.get('#author').type('Test Author1')
    cy.get('#url').type('http://testurl.com')
    cy.get('#create-button').click()
    cy.contains('Create Blog').click()
    cy.get('#title').type('Test Blog2')
    cy.get('#author').type('Test Author2')
    cy.get('#url').type('http://testurl.com')
    cy.get('#create-button').click()
    cy.contains('Create Blog').click()
    cy.get('#title').type('Test Blog3')
    cy.get('#author').type('Test Author3')
    cy.get('#url').type('http://testurl.com')
    cy.get('#create-button').click()
    cy.contains('view').click()
    cy.contains('Like').click().then(() => {
      cy.reload()
    })
    cy.contains('view').click()
    cy.contains('Like').click().then(() => {
      cy.reload()
    })
    cy.contains('view').click()
    cy.contains('Like').click().then(() => {
      cy.reload()
    })
    cy.get('.blog').then(blogs => {
      cy.wrap(blogs[0]).contains('Test Blog3')
      cy.wrap(blogs[1]).contains('Test Blog2')
      cy.wrap(blogs[2]).contains('Test Blog1')
    })

  })
})