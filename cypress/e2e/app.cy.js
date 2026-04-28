describe('E2E Tests - Sistema de Asistencias', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load home page', () => {
    cy.get('.layout').should('be.visible');
    cy.get('.sidebar-logo').should('be.visible');
    cy.contains('EduGest').should('be.visible');
  });

  it('should navigate to estudiantes', () => {
    cy.get('.nav-item').contains('Estudiantes').click();
    cy.url().should('include', '/estudiantes');
  });

  it('should navigate to cursos', () => {
    cy.get('.nav-item').contains('Cursos').click();
    cy.url().should('include', '/cursos');
  });

  it('should navigate to inscripciones', () => {
    cy.get('.nav-item').contains('Inscripciones').click();
    cy.url().should('include', '/inscripciones');
  });

  it('should navigate to asistencias', () => {
    cy.get('.nav-item').contains('Asistencias').click();
    cy.url().should('include', '/asistencias');
  });

  it('mobile menu should work', () => {
    cy.viewport(375, 667);
    cy.get('.mobile-menu-button').click();
    cy.get('.mobile-menu').should('be.visible');
  });
});
