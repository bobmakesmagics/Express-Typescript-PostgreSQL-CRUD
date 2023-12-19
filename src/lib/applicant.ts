import prisma from '../client';

interface Applicant {
  username: string;
  email: string;
  password: string;
  admin?: boolean;
}

const getApplicants = async () => {
  const applicants = await prisma.applicant.findMany();
  return applicants;
};

const createApplicant = async (params: Applicant) => {
  const applicant = await prisma.applicant.create({
    data: params,
  });

  return applicant;
};

const updateApplicant = async (id: string, params: Applicant) => {
  const applicant = await prisma.applicant.update({
    where: { id },
    data: params,
  });
  return applicant;
};

const deleteApplicant = async (id: string) => {
  const applicant = await prisma.applicant.delete({
    where: { id },
  });
  return applicant;
};

export { getApplicants, createApplicant, updateApplicant, deleteApplicant };
