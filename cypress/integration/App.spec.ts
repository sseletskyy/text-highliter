describe("App", () => {
    it("cy.get() - query DOM elements", () => {
        cy.visit("http://localhost:3000")
        cy.get("h1").contains("Test")
    })
})
