const newRacerName = ['Иван', 'Петров', 'Сергеевич'];

function registerRaceEvents() {
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
}

function powerOn() {
    cy.get('.pi-power-off').click()
    cy.contains('StandBy').click()
}

describe('Test timing', () => {
  
  beforeEach(()=>{
    cy.viewport(1440, 950)
    cy.visit('http://localhost:4200/')
    cy.wait(300);
    cy.visit('http://localhost:4200/')  
    cy.contains('Race').click()
    cy.contains('LCPF').click()
  })  

  it('Should start race and register raceevents', () => {

    powerOn();
    cy.get('.pi-angle-right').click()
    cy.get('.pi-angle-right').click()
    cy.get('.pi-angle-right').click()

    cy.get('.racer-title > :nth-child(1)').should('contain.text', '3')

    registerRaceEvents()

  })

  it('Should register and select racer, use it in race', () => {

    powerOn();
    cy.get('.pi-angle-right').click()

    cy.get('.racer-title > :nth-child(2)').click()
    cy.contains('Register Racer').click()
    cy.contains('Зарегистрировать').should('be.disabled');

    cy.get('.input-block > input[type="number"]').invoke('val').then((nextRacerNum) => {
      

      const name = newRacerName.map(n => n + nextRacerNum);

      cy.get('.input-block > :nth-child(4)').type(name[0])
      cy.get('.input-block > :nth-child(6)').type(name[1])
      cy.get('.input-block > :nth-child(8)').type(name[2])

      cy.contains('Зарегистрировать').should('not.be.disabled').click();
      cy.get('.p-input-icon-left > .p-inputtext').type(name.join(' '))
      cy.get('#pr_id_4-table > .p-datatable-tbody > :nth-child(1) > :nth-child(2)').should('contain.text', name.join(' ')).click();
      cy.get('.racer-title > :nth-child(2)').should('contain.text', name.join(' '))

      registerRaceEvents();
    
    })
  })

  it('Register Racer validation', () => {

    powerOn();
    cy.get('.pi-angle-right').click()

    cy.get('.racer-title > :nth-child(2)').click()
    cy.contains('Register Racer').click()
    cy.contains('Зарегистрировать').should('be.disabled');

    cy.get('.input-block > input[type="number"]').invoke('val').then((nextRacerNum) => {
      if (typeof nextRacerNum === 'string') {
        const name = newRacerName.map(n => n + nextRacerNum);
        cy.contains('Зарегистрировать').should('be.disabled');

        cy.get('.input-block > :nth-child(4)').type(name[0])
        cy.contains('Зарегистрировать').should('be.disabled');

        cy.get('.input-block > :nth-child(8)').type(name[2])
        cy.contains('Зарегистрировать').should('be.disabled');
        
        cy.get('.input-block > :nth-child(6)').type(name[1])
        cy.contains('Зарегистрировать').should('not.be.disabled');

        cy.get('.input-block > input[type="number"]').clear()
        cy.contains('Зарегистрировать').should('be.disabled');
        
        cy.get('.input-block > input[type="number"]').type( String(parseInt(nextRacerNum)) )
        cy.contains('Зарегистрировать').should('not.be.disabled');

        cy.get('.input-block > input[type="number"]').clear().type( String(parseInt(nextRacerNum) - 1))
        cy.get('.form-error').should('contain.text', 'Racer Number already exists:');
        cy.contains('Зарегистрировать').should('be.disabled');

        cy.get('.input-block > input[type="number"]').clear().type( String(parseInt(nextRacerNum)) )
        cy.get('.form-error').should('not.exist');
        cy.contains('Зарегистрировать').should('not.be.disabled').click();

        cy.get('.p-input-icon-left > .p-inputtext').type(name.join(' '));
        cy.get('.p-datatable-tbody > .p-element > :nth-child(2)').should('contain.text', name.join(' ')).click();
        cy.get('.racer-title > :nth-child(2)').should('contain.text', name.join(' '))
      }
    
    })

  })
})