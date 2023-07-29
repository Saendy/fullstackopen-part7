describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Duderino',
      username: 'testuser',
      password: 'bigsecrettestingpassword'
    }
    const user2 = {
      name: 'Test Duderino2',
      username: 'testuser2',
      password: 'bigsecrettestingpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('bigsecrettestingpassword')
      cy.get('#login-button').click()

      cy.contains('Test Duderino logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('Blog app', function () {

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'testuser', password: 'bigsecrettestingpassword' })
      })

      it('A blog can be created', function () {
        cy.contains('add blog').click()

        cy.get('input[placeholder*="title"]').type('test-title')
        cy.get('input[placeholder*="author"]').type('test-author')
        cy.get('input[placeholder*="url"]').type('test-url')

        cy.get('button[type*="submit"]').click()

        cy.contains('test-title test-author')
      })

      describe('When logged in', function () {
        beforeEach(function () {
          cy.createblog({ title: 'test-title', author: 'test-author', url: 'test-url' })
        })

        it('A blog can be liked', function () {
          cy.get('.blog').contains('show').click()
          cy.get('.blog').contains('like').click()
          cy.get('.blog').contains('likes 1')
        })

        it('A blog can be deleted', function () {
          cy.get('.blog').contains('show').click()
          cy.get('.blog').contains('delete').click()
          cy.get('.blog').should('not.exist');
        })

        it('delete button is not shown to users who did not create blog', function () {
          cy.login({ username: 'testuser2', password: 'bigsecrettestingpassword' })
          cy.get('.blog').contains('show').click()

          cy.get('.blog').contains('delete').should('not.exist');
        })
        describe('with multiple blogs', function () {
          beforeEach(function () {
            cy.createblog({ title: 'second-title', author: 'test-author', url: 'test-url' })
          })
          it('blogs are ordered by likes', function () {
            cy.contains('second-title').contains('show').click()
            cy.get('.blog').contains('like').click()
            cy.contains('second-title').contains('hide').click()

            cy.get('.blog').eq(0).should('contain', 'second-title')
            cy.get('.blog').eq(1).should('contain', 'test-title')


          })
        })
      })

    })

  })
})