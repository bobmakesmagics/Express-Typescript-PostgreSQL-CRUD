import {
  getApplicants,
  createApplicant,
  updateApplicant,
  deleteApplicant,
} from '../../src/lib/applicant';
import { prismaMock } from '../../src/singleton';
import { v4 as uuidv4 } from 'uuid';

let applicantId: string;

test('should create new applicant ', async () => {
  const applicant = {
    id: uuidv4(),
    username: 'Rich',
    email: 'hellotest@prisma.io',
    password: '123',
    admin: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.applicant.create.mockResolvedValue(applicant);

  const newApplicant = await createApplicant(applicant);
  applicantId = newApplicant.id;
  expect(newApplicant).toEqual(
    expect.objectContaining({
      username: 'Rich',
      email: 'hellotest@prisma.io',
      password: '123',
      admin: false,
    })
  );
});

test('should return all applicants ', async () => {
  const mockApplicants = [
    {
      id: uuidv4(),
      username: 'Rich',
      email: 'hellotest@prisma.io',
      password: '123',
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  prismaMock.applicant.findMany.mockResolvedValue(mockApplicants);

  const applicants = await getApplicants();
  expect(applicants.length).toBeGreaterThan(0);
});

test('should update a applicant ', async () => {
  const applicant = {
    id: uuidv4(),
    username: 'Rich Joe',
    email: 'hellotest@prisma.io',
    password: '123',
    admin: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
  prismaMock.applicant.update.mockResolvedValue(applicant);

  const newApplicant = await updateApplicant(applicantId, applicant);
  expect(newApplicant).toEqual(
    expect.objectContaining({
      username: 'Rich Joe',
      email: 'hellotest@prisma.io',
      password: '123',
      admin: true,
    })
  );
});

test('should update a applicant ', async () => {
  const mockApplicant = {
    id: uuidv4(),
    username: 'Rich Joe',
    email: 'hellotest@prisma.io',
    password: '123',
    admin: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.applicant.delete.mockResolvedValue(mockApplicant);

  const newApplicant = await deleteApplicant(applicantId);
  expect(newApplicant).toEqual(
    expect.objectContaining({
      username: 'Rich Joe',
      email: 'hellotest@prisma.io',
      password: '123',
      admin: true,
    })
  );
});
