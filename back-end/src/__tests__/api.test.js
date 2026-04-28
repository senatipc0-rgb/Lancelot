const request = require('supertest');
const app = require('../app');
const db = require('../config/database');

describe('API Tests', () => {
  beforeAll(async () => {
    await db.query('SELECT 1');
  });

  describe('Health Check', () => {
    test('GET /api/health should return 200', async () => {
      const response = await request(app).get('/api/health');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('services');
    });
  });

  describe('Routes 404', () => {
    test('GET /api/nonexistent should return 404', async () => {
      const response = await request(app).get('/api/nonexistent');
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('CORS', () => {
    test('GET /api/health with origin should have CORS headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .set('Origin', 'http://localhost:3000');
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});

// Unit tests for controllers
describe('Usuario Controller', () => {
  test('Login without credentials should return 400', async () => {
    const response = await request(app)
      .post('/api/usuarios/login')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register without data should return 400', async () => {
    const response = await request(app)
      .post('/api/usuarios/register')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('Estudiante Controller', () => {
  test('GET /api/estudiantes should return 200', async () => {
    const response = await request(app).get('/api/estudiantes');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Rate Limiting', () => {
  test('Multiple requests should trigger rate limit', async () => {
    const requests = Array(105).fill(
      request(app).get('/api/health')
    );
    const responses = await Promise.all(requests);
    const rateLimited = responses.some(r => r.statusCode === 429);
    expect(rateLimited).toBe(true);
  });
});
