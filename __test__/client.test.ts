import prisma from '../src/client';

describe('Prisma Client Initialization', () => {
  it('should create Prisma client instance', () => {
    expect(prisma).toBeDefined();
  });

  it('should have required PrismaClient methods', () => {
    expect(prisma.applicant.findMany).toBeDefined();
  });
});
