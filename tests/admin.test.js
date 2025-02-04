const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

let adminToken;

beforeAll(async () => {
  // Create a test admin
  await User.create({
    name: 'Test Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    salary: 80000,
  });

  // Login to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'admin123',
    });
  adminToken = res.body.token;
});

describe('Admin Endpoints', () => {
  it('should create a new employee', async () => {
    const res = await request(app)
      .post('/api/admin/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'New Employee',
        email: 'new@example.com',
        password: 'new123',
        role: 'employee',
        salary: 50000,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', 'new@example.com');
  });
});