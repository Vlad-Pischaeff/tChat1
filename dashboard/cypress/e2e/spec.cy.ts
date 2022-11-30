describe('Auth Form Test', () => {
    it('Visits the Dashboard', () => {
        cy.visit('http://localhost:3000')

        cy.get('nav')
            .contains('Sign Up', { matchCase: false })
            .should('have.attr', 'href', '/signup')

        cy.get('form').contains('form', 'Login', { matchCase: false }).should('be.visible')

        cy.get('label').contains('Login Name', { matchCase: false }).should('be.visible')
        cy.get('label').contains('Password', { matchCase: false }).should('be.visible')

        cy.get("input[name='name']").should('be.visible')

        cy.get("input[name='password']").should('have.attr', 'type', 'password')
        cy.get("img[alt='eye blocked']").should('be.visible')
        cy.get("img[alt='eye blocked']").click()
        cy.get("input[name='password']").should('have.attr', 'type', 'text')

        cy.get("input[type='submit']").should('be.visible')

        cy.get('form').contains('form', 'Login', { matchCase: false }).within(() => {
            cy.contains('Forgot password', { matchCase: false })
                .should('have.attr', 'href', '/restore')
        })
    })

    it('Sign up Form', () => {
        cy.visit('http://localhost:3000')

        cy.get('nav')
            .contains('sign up', { matchCase: false })
            .should('have.attr', 'href', '/signup')
            .click()    // переходим на страницу с регистрацией

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')

        cy.get('form').contains('form', 'Signup', { matchCase: false }).should('be.visible')

        cy.get('label').contains('Login Name', { matchCase: false }).should('be.visible')
        cy.get('label').contains('Email', { matchCase: false }).should('be.visible')
        cy.get('label').contains('Password', { matchCase: false }).should('be.visible')

        cy.get("input[name='name']").should('be.visible')
        cy.get("input[name='email']").should('be.visible')

        cy.get("input[name='password']").should('have.attr', 'type', 'password')
        cy.get("img[alt='eye blocked']").should('be.visible')
        cy.get("img[alt='eye blocked']").click()
        cy.get("input[name='password']").should('have.attr', 'type', 'text')

        cy.get("input[type='submit']").should('be.visible')

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')
            .click()    // возвращаемся на страницу входа
    })

    it('Forgot password Form', () => {

        cy.get('form').contains('form', 'Login', { matchCase: false }).within(() => {
            cy.contains('Forgot password', { matchCase: false })
                .should('have.attr', 'href', '/restore')
                .click() // переходим на страницу с отправкой ссылки на изменение пароля
        })

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')

        cy.get('form').contains('form', 'Restore', { matchCase: false }).should('be.visible')

        cy.get('label').contains('Email', { matchCase: false }).should('be.visible')

        cy.get("input[name='email']").should('be.visible')

        cy.get("input[type='submit']").should('be.visible')

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')
            .click()    // возвращаемся на страницу входа
    })
})
