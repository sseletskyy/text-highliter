describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('should have Highlight Section', () => {
        cy.get('.highlight-section').should('exist')
    })
    describe('Highlight Section', () => {
        it('should have three color pickers', () => {
            cy.get('.highlight-section')
                .find('.color-picker')
                .should('have.lengthOf', 3)
        })
        it('first color picker should be red', () => {
            cy.get('.highlight-section')
                .find('.color-picker')
                .first()
                .should('have.css', 'background-color')
                .and('eq', 'rgb(255, 0, 0)')
        })
        it('second color picker should be yellow', () => {
            cy.get('.highlight-section')
                .find('.color-picker')
                .eq(1)
                .should('have.css', 'background-color')
                .and('eq', 'rgb(255, 255, 0)')
        })
        it('third color picker should be green', () => {
            cy.get('.highlight-section')
                .find('.color-picker')
                .eq(2)
                .should('have.css', 'background-color')
                .and('eq', 'rgb(144, 238, 144)')
        })
    })
})
