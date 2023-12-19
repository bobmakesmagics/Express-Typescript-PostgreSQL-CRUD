import request from 'supertest';
import app from '../../src/app';

let applicantId: string;

describe('POST /applicant', () => {
  it('should create a applicant', async () => {
    const res = await request(app).post('/awesome/applicant').send({
      username: 'Test User',
      email: 'test@gamil.com',
      password: '',
      admin: false,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Test User');
    applicantId = res.body.id;
  });
});

describe('GET /applicant', () => {
  it('should return all applicants', async () => {
    const res = await request(app).get('/awesome/applicant');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('PUT /applicant/:id', () => {
  it('should respond with status 400 if invalid applicant data', async () => {
    const response = await request(app)
      .put(`/awesome/applicant/${applicantId}`) // Replace with a valid ID
      .send({ username: 123, email: 'test@gmail.com', admin: true });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid applicant data' });
  });

  it('should update an applicant and respond with status 200', async () => {
    const response = await request(app)
      .put(`/awesome/applicant/${applicantId}`) // Replace with a valid ID
      .send({
        username: 'John Doe',
        email: 'test@temp.com',
        password: '111',
        admin: false,
      });

    expect(response.status).toBe(200);
  });
});

describe('DELETE /applicant/:id', () => {
  it('should delete a applicant', async () => {
    const res = await request(app).delete(`/awesome/applicant/${applicantId}`);
    expect(res.statusCode).toBe(200);
  });
});
