import request from 'supertest';
import app from '../src/app';

describe('Express App', () => {
  it('responds with welcome message on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the CRUD App!');
  });

  //   it('responds with 404 on unknown routes', async () => {
  //     const response = await request(app).get('/unknown-route');
  //     expect(response.status).toBe(404);
  //   });
});
