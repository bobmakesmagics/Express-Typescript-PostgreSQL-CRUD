import {
  getApplicants,
  createApplicant,
  deleteApplicant,
  updateApplicant,
} from '../../src/lib/applicant';
import request from 'supertest';
import app from '../../src/app';
import { v4 as uuidv4 } from 'uuid';
import * as uuid from 'uuid';

jest.mock('../../src/lib/applicant', () => ({
  createApplicant: jest.fn(),
  deleteApplicant: jest.fn(),
  getApplicants: jest.fn(),
  updateApplicant: jest.fn(),
}));

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  validate: jest.fn(),
}));

describe('Applicant Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET / should get applicants', async () => {
    const mockApplicants = [
      {
        id: uuidv4(),
        username: 'Rich',
        email: 'hellotest@prisma.io',
        password: '123',
        admin: false,
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      },
    ];
    (getApplicants as jest.Mock).mockResolvedValue(mockApplicants);

    const response = await request(app).get('/awesome/applicant');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockApplicants);
  });

  it('GET / should handle error while getting applicants', async () => {
    const mockError = new Error('Failed to get applicants');
    (getApplicants as jest.Mock).mockRejectedValue(mockError);

    const response = await request(app).get('/awesome/applicant');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error fetching applicants' });
  });

  it('POST / should create an applicant', async () => {
    const mockApplicant = {
      id: uuidv4(),
      username: 'Rich',
      email: 'hellotest@prisma.io',
      password: '123',
      admin: false,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    (createApplicant as jest.Mock).mockResolvedValue(mockApplicant);

    const response = await request(app).post('/awesome/applicant').send({
      username: 'Rich',
      email: 'hellotest@prisma.io',
      password: '123',
      admin: false,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockApplicant);
  });

  it('POST / should handle invalid applicant data', async () => {
    const response = await request(app).post('/awesome/applicant').send({
      username: '',
      email: 'test@prisma.io',
      password: '123',
      admin: false,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid applicant data' });
    expect(createApplicant).not.toHaveBeenCalled();
  });

  it('POST / should handle error while creating an applicant', async () => {
    const mockError = new Error('Failed to create an applicant');
    (createApplicant as jest.Mock).mockRejectedValue(mockError);

    const response = await request(app).post('/awesome/applicant').send({
      username: 'Rich',
      email: 'hellotest@prisma.io',
      password: '123',
      admin: false,
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error adding applicant' });
  });

  it('PUT /:id should update an applicant', async () => {
    const mockApplicantId = 'valid-id';
    const mockUpdatedApplicant = {
      username: 'Updated User',
      email: 'updatedemail@test.com',
      password: 'newpassword',
      admin: true,
    };
    (updateApplicant as jest.Mock).mockResolvedValue(undefined);
    (uuid.validate as jest.Mock).mockReturnValue(true);

    const response = await request(app)
      .put(`/awesome/applicant/${mockApplicantId}`)
      .send(mockUpdatedApplicant);

    expect(uuid.validate).toHaveBeenCalledWith(mockApplicantId);
    expect(updateApplicant).toHaveBeenCalledWith(
      mockApplicantId,
      mockUpdatedApplicant
    );
    expect(response.status).toBe(200);
  });

  it('PUT /:id should handle invalid applicant ID', async () => {
    const invalidApplicantId = 'invalid-id';
    const mockUpdatedApplicant = {
      username: 'Updated User',
      email: 'updatedemail@test.com',
      password: 'newpassword',
      admin: true,
    };
    (uuid.validate as jest.Mock).mockReturnValue(false);

    const response = await request(app)
      .put(`/awesome/applicant/${invalidApplicantId}`)
      .send(mockUpdatedApplicant);

    expect(uuid.validate).toHaveBeenCalledWith(invalidApplicantId);
    expect(updateApplicant).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
  });

  it('PUT /:id should handle error while updating an applicant', async () => {
    const mockApplicantId = 'valid-id';
    const mockUpdatedApplicant = {
      username: 'Updated User',
      email: 'updatedemail@test.com',
      password: 'newpassword',
      admin: true,
    };
    (uuid.validate as jest.Mock).mockReturnValue(true);
    const mockError = new Error('Failed to update applicant');
    (updateApplicant as jest.Mock).mockRejectedValue(mockError);

    const response = await request(app)
      .put(`/awesome/applicant/${mockApplicantId}`)
      .send(mockUpdatedApplicant);

    expect(uuid.validate).toHaveBeenCalledWith(mockApplicantId);
    expect(updateApplicant).toHaveBeenCalledWith(
      mockApplicantId,
      mockUpdatedApplicant
    );
    expect(response.status).toBe(500);
  });

  it('DELETE /:id should delete an applicant', async () => {
    const mockApplicantId = 'valid-id';
    (uuid.validate as jest.Mock).mockReturnValue(true);
    (deleteApplicant as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app).delete(
      `/awesome/applicant/${mockApplicantId}`
    );

    expect(uuid.validate).toHaveBeenCalledWith(mockApplicantId);
    expect(deleteApplicant).toHaveBeenCalledWith(mockApplicantId);
    expect(response.status).toBe(200);
  });

  it('DELETE /:id should handle invalid applicant ID', async () => {
    const invalidApplicantId = 'invalid-id';
    (uuid.validate as jest.Mock).mockReturnValue(false);

    const response = await request(app).delete(
      `/awesome/applicant/${invalidApplicantId}`
    );

    expect(uuid.validate).toHaveBeenCalledWith(invalidApplicantId);
    expect(deleteApplicant).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
  });

  it('DELETE /:id should handle error while deleting an applicant', async () => {
    const mockApplicantId = 'valid-id';
    (uuid.validate as jest.Mock).mockReturnValue(true);
    const mockError = new Error('Failed to delete applicant');
    (deleteApplicant as jest.Mock).mockRejectedValue(mockError);

    const response = await request(app).delete(
      `/awesome/applicant/${mockApplicantId}`
    );

    expect(uuid.validate).toHaveBeenCalledWith(mockApplicantId);
    expect(deleteApplicant).toHaveBeenCalledWith(mockApplicantId);
    expect(response.status).toBe(500);
  });
});
