import { Router, Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import {
  createApplicant,
  deleteApplicant,
  getApplicants,
  updateApplicant,
} from '../lib/applicant';

const router = Router();

interface Applicant {
  id: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await getApplicants();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching applicants' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { username, email, password, admin } = req.body;

  if (typeof username !== 'string' || username.trim() === '' || !email) {
    return res.status(400).json({ error: 'Invalid applicant data' });
  }

  try {
    const result = await createApplicant({
      username,
      email,
      password,
      admin,
    });
    res.status(201).json(result);
  } catch (error) {
    // console.error('Error adding applicant', error);
    res.status(500).json({ error: 'Error adding applicant' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const applicantID = req.params.id;

  if (!uuidValidate(applicantID)) {
    return res.status(400).json({ error: 'Invalid applicant ID' });
  }

  try {
    await deleteApplicant(applicantID);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting applicant' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const applicantID = req.params.id;
  const { username, email, password, admin } = req.body;

  if (
    !uuidValidate(applicantID) ||
    typeof username !== 'string' ||
    username.trim() === '' ||
    !email
  ) {
    return res.status(400).json({ error: 'Invalid applicant data' });
  }

  try {
    await updateApplicant(applicantID, { username, email, password, admin });
    res.sendStatus(200);
  } catch (error) {
    // console.error('Error updating applicantID', error);
    res.status(500).json({ error: 'Error updating applicantID' });
  }
});

export default router;
