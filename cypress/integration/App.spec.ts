// @ts-ignore
const getHighlightSection = () => cy.get('.highlight-section')
// @ts-ignore
const getHighlightTextArea = () => cy.get('.highlight-section .highlight-text-area')

describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('should have Highlight Section', () => {
        getHighlightSection().should('exist')
    })
    describe('Highlight Section', () => {
        it('should have three color pickers', () => {
            getHighlightSection()
                .find('.color-picker')
                .should('have.lengthOf', 3)
        })
        it('first color picker should be red', () => {
            getHighlightSection()
                .find('.color-picker')
                .eq(0)
                .should('have.css', 'background-color')
                .and('eq', 'rgb(255, 0, 0)')
        })
        it('second color picker should be yellow', () => {
            getHighlightSection()
                .find('.color-picker')
                .eq(1)
                .should('have.css', 'background-color')
                .and('eq', 'rgb(255, 255, 0)')
        })
        it('third color picker should be green', () => {
            getHighlightSection()
                .find('.color-picker')
                .eq(2)
                .should('have.css', 'background-color')
                .and('eq', 'rgb(144, 238, 144)')
        })
        it('first color picker should be selected by default (css box-shadow)', () => {
            getHighlightSection()
                .find('.color-picker')
                .eq(0)
                .should('have.css', 'box-shadow')
                .and('eq', 'rgb(128, 128, 128) 4px 4px 4px 0px')
        })
        it('second color picker should NOT be selected by default (css box-shadow)', () => {
            getHighlightSection()
                .find('.color-picker')
                .eq(1)
                .should('have.css', 'box-shadow')
                .and('eq', 'none')
        })
        describe('Highlight Text Area', () => {
            it('should be', () => {
                getHighlightTextArea().should('exist')
            })
            it('should have a yellow span', () => {
                getHighlightTextArea()
                    .find('span.yellow')
                    .contains('Lorem Ipsum')
                    .should('have.css', 'background-color')
                    .and('eq', 'rgb(255, 255, 0)')
            })
            it('should have a red span', () => {
                getHighlightTextArea()
                    .find('span.red')
                    .contains('Ipsum')
                    .should('have.css', 'background-color')
                    .and('eq', 'rgb(255, 0, 0)')
            })
            it('should have a green span', () => {
                getHighlightTextArea()
                    .find('span.green')
                    .contains('standard')
                    .should('have.css', 'background-color')
                    .and('eq', 'rgb(144, 238, 144)')
            })
        })
        describe('when the text is highlighted', () => {
            it('should be highlighted with selected color', () => {
                // check the first span has no highlight color
                getHighlightTextArea()
                    .find('span')
                    .eq(0)
                    .should('have.css', 'background-color')
                    .and('eq', 'rgba(0, 0, 0, 0)')
                // trigger selection of first span
                getHighlightTextArea()
                    .find('span')
                    .eq(0)
                    .trigger('mousedown')
                    .then($el => {
                        const el = $el[0]
                        const document = el.ownerDocument
                        // @ts-ignore
                        const range = document.createRange()
                        range.selectNodeContents(el)
                        // @ts-ignore
                        document.getSelection().removeAllRanges()
                        // @ts-ignore
                        document.getSelection().addRange(range)
                    })
                    .trigger('mouseup')
                cy.document().trigger('selectionchange')
                // check the first span has red highlight color
                getHighlightTextArea()
                    .find('span')
                    .eq(0)
                    .should('have.css', 'background-color')
                    .and('eq', 'rgb(255, 0, 0)')
            })
        })
    })
})
