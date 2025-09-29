import request from 'supertest';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import app from '../../src/app'; // Correct path to the Express app
import User from '../../assets/models/user.model';

// A helper to connect to a test database before tests run
const setupTestDB = () => {
  beforeAll(async () => {
    // Use an in-memory MongoDB server or a separate test database
    const url = `mongodb://127.0.0.1:27017/proconnect-test`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    // Clean up the database after each test
    await User.deleteMany();
  });

  afterAll(async () => {
    // Disconnect from the database after all tests
    await mongoose.disconnect();
  });
};

describe('Auth Routes', () => {
  setupTestDB();

  const newUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  describe('POST /api/auth/signup', () => {
    it('should return 201 and successfully create a new user if data is valid', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user).toMatchObject({
        name: newUser.name,
        email: newUser.email,
      });
      expect(res.body.tokens).toHaveProperty('access');

      const dbUser = await User.findById(res.body.user.id);
      expect(dbUser).toBeDefined();
    });

    it('should return 400 error if email is already taken', async () => {
      await User.create(newUser); // Pre-populate the user

      await request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 and auth tokens if credentials are correct', async () => {
      await User.create(newUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: newUser.email, password: newUser.password })
        .expect(httpStatus.OK);

      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user.email).toBe(newUser.email);
      expect(res.body.tokens).toHaveProperty('access');
    });

    it('should return 401 error if password is incorrect', async () => {
      await User.create(newUser);

      await request(app)
        .post('/api/auth/login')
        .send({ email: newUser.email, password: 'wrongpassword' })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 401 error if email is not found', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});