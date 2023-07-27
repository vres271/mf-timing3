describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1440, 950)
    cy.visit('http://localhost:4200/')
    cy.contains('Administration').click()
    cy.get('.p-dropdown-trigger').click()
    cy.contains('Mock').click()
    cy.contains('Race').click()
    cy.contains('LCPF').click()

    cy.get('.pi-power-off').click()
    cy.wait(100);
    cy.contains('StandBy').click()

    cy.get('.pi-angle-right').click()
    cy.get('.pi-angle-right').click()
    cy.get('.pi-angle-right').click()

    cy.contains('Point').click()
    cy.wait(1000);
    cy.contains('Point').click()
    cy.wait(1000);
    cy.contains('Point').click()
    cy.wait(1000);
    cy.contains('Point').click()
    cy.wait(1000);
    cy.contains('Point').click()
    cy.wait(1000);

    // cy.contains('LCPF').click()
  })
})