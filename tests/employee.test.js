const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Task = require('../models/Task');

let employeeToken;

beforeAll(async () => {
  // Create a test employee
  await User.create({
    name: 'Test Employee',
    email: 'test@example.com',
    password: 'test123',
    role: 'employee',
    salary: 40000,
  });

  // Login to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'test123',
    });
  employeeToken = res.body.token;
});

describe('Employee Endpoints', () => {
  it('should get employee details', async () => {
    const res = await request(app)
      .get('/api/employee/details')
      .set('Authorization', `Bearer ${employeeToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });
});