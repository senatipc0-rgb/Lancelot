// ***********************************************************
// Cypress Custom Commands
// ***********************************************************

// Login command
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/usuarios/login',
    body: { username, password }
  }).then((response) => {
    window.localStorage.setItem('token', response.body.data.token);
    return response;
  });
});

// API request with auth
Cypress.Commands.add('apiRequest', (options) => {
  const token = window.localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
  
  return cy.request({
    ...options,
    headers
  });
});

// Form fill command
Cypress.Commands.add('fillForm', (selector, data) => {
  Object.keys(data).forEach(key => {
    cy.get(`${selector} [name="${key}"]`).type(data[key]);
  });
});
