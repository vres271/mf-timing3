describe('Test timing', () => {
  it('LCPF race', () => {
    cy.viewport(1440, 950)
    cy.visit('http://localhost:4200/')
    cy.wait(300);
    cy.visit('http://localhost:4200/')

    cy.contains('Race').click()
    cy.contains('LCPF').click()

    cy.get('.pi-power-off').click()
    cy.wait(100);
    cy.contains('StandBy').click()

    cy.get('.pi-angle-right').click()
    cy.get('.pi-angle-right').click()
    cy.get('.pi-angle-right').click()

    cy.get('.racer-title > :nth-child(1)').should('contain.text', '3')

    cy.contains('Point').click()
    cy.get('.p-toolbar-group-start > .mr-2 > .p-ripple').should('contain.text', 'Race')
    cy.wait(500);
    cy.get('.p-button').contains('Point').click()
    cy.wait(500);
    cy.get('.p-button').contains('Point').click()
    cy.wait(500);
    cy.get('.p-button').contains('Point').click()
    cy.wait(500);
    cy.get('.p-button').contains('Point').click()
    cy.wait(500);

    cy.get('.p-toolbar-group-start > .mr-2 > .p-ripple').should('contain.text', 'StandBy')
    cy.get('.p-highlight').should('contain.text', '4')

    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(3)').should('contain.text', 'Finish')
    cy.get(':nth-child(3) > :nth-child(3)').should('contain.text', 'Point')
    cy.get(':nth-child(4) > :nth-child(3)').should('contain.text', 'Point')
    cy.get(':nth-child(5) > :nth-child(3)').should('contain.text', 'Point')
    cy.get(':nth-child(6) > :nth-child(3)').should('contain.text', 'Start')

    cy.get('.racer-title > :nth-child(2)').invoke('text').then((racerName) => {
      cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').should('contain.text', racerName);
      cy.get(':nth-child(3) > :nth-child(2)').should('contain.text', racerName);
      cy.get(':nth-child(4) > :nth-child(2)').should('contain.text', racerName);
      cy.get(':nth-child(5) > :nth-child(2)').should('contain.text', racerName);
      cy.get(':nth-child(6) > :nth-child(2)').should('contain.text', racerName);
    });

    cy.get(':nth-child(5) > :nth-child(4)').invoke('text').then(time => {
      cy.get('.p-steps').contains(time).should('exist');
    })
    cy.get(':nth-child(4) > :nth-child(4)').invoke('text').then(time => {
      cy.get('.p-steps').contains(time).should('exist');
    })
    cy.get(':nth-child(3) > :nth-child(4)').invoke('text').then(time => {
      cy.get('.p-steps').contains(time).should('exist');
    })
    cy.get('.p-datatable-tbody > :nth-child(2) > :nth-child(4)').invoke('text').then(time => {
      cy.get('.p-steps').contains(time).should('exist');
    })
  

    // cy.contains('LCPF').click()
  })
})