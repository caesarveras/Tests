/// <reference types="cypress" />

describe('CRUD reservar pousada', () => {
  let bookingId;
  let token;
  let baseUrl;
  let bookingData;
  let updatedBookingData;

  before(() => {
    cy.fixture('data').then((data) => {
      baseUrl = data.ambientes.API;
      
      bookingData = {
        firstname: 'Joãozinho',
        lastname: 'Silva',
        totalprice: 1650.00,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-06-01',
          checkout: '2025-06-15'
        },
        additionalneeds: 'Café da manhã'
      };
    
      updatedBookingData = {
        firstname: 'Mariazinha',
        lastname: 'Silva',
        totalprice: 1410.00,
        depositpaid: false,
        bookingdates: {
          checkin: '2025-03-02',
          checkout: '2025-03-10'
        },
        additionalneeds: 'Quarto com Varanda'
      };
    });
  });

  before('autenticação', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth`,
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });
  });

  it('Cria uma nova reserva (Crud)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/booking`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bookingData
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking).to.have.property('firstname', bookingData.firstname);
      expect(response.body.booking).to.have.property('lastname', bookingData.lastname);
      expect(response.body.booking).to.have.property('totalprice', bookingData.totalprice);
      
      bookingId = response.body.bookingid;
    });
  });
  
  it('Consulta a reserva (cRud)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/booking/${bookingId}`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('firstname', bookingData.firstname);
      expect(response.body).to.have.property('lastname', bookingData.lastname);
      expect(response.body.bookingdates.checkin).to.eq(bookingData.bookingdates.checkin);
    });
  });
  
  it('Atualiza a reserva (crUd)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      body: updatedBookingData
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('firstname', updatedBookingData.firstname);
      expect(response.body).to.have.property('lastname', updatedBookingData.lastname);
      expect(response.body.bookingdates.checkin).to.eq(updatedBookingData.bookingdates.checkin);
    });
  });

  it('Atualiza alguns dados da reserva (crUd)', () => {
    const partialUpdate = {
      firstname: 'Jorge',
      additionalneeds: 'Ar condicionado'
    };
    
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/booking/${bookingId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      body: partialUpdate
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('firstname', partialUpdate.firstname);
      expect(response.body).to.have.property('additionalneeds', partialUpdate.additionalneeds);
      expect(response.body).to.have.property('lastname', updatedBookingData.lastname);
    });
  });
  
  it('deleta reserva (cruD)', () => {
    //reautenticar
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth`,
      body: {
        username: 'admin',
        password: 'password123'
      }
    }).then((authResponse) => {
      const freshToken = authResponse.body.token;
      
      //delete com token reautenticado
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${freshToken}`
        },
        failOnStatusCode: false
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(201);
        
        // Verificação da reserva deletada
        cy.request({
          method: 'GET',
          url: `${baseUrl}/booking/${bookingId}`,
          headers: {
            'Accept': 'application/json'
          },
          failOnStatusCode: false 
        }).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });
  });
  
  it('Lista todas as reservas', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/booking`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      response.body.forEach(booking => {
        expect(booking).to.have.property('bookingid');
      });
    });
  });
  
  it('Filtra reservas por nome', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/booking?firstname=John`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});