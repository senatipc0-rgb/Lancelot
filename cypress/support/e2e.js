// ***********************************************************
// E2E (Cypress) Support File
// ***********************************************************

import './commands'

// Hide fetch/XHR requests from command log
Cypress.on('window:before:load', (win) => {
  const originalFetch = win.fetch;
  win.fetch = (...args) => {
    Cypress.log({
      name: 'fetch',
      message: args[0]
    });
    return originalFetch(...args);
  };
});

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
