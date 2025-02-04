const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Token = require('../models/Token');

describe('Auth Endpoints', () => {
  let token;

  beforeAll(async () => {
    // Create a test user
    await User.create({
      name: 'Test User',
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
    token = res.body.token;
  });

  it('should logout a user', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logged out successfully');

    // Verify token is blacklisted
    const isBlacklisted = await Token.findOne({ token });
    expect(isBlacklisted).toBeTruthy();
  });
});