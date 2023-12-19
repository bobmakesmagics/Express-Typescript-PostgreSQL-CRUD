import { Router, Request, Response } from 'express';
import pool from '../db';
import { validate as uuidValidate } from 'uuid';

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
    const result = await pool.query('SELECT * FROM applicant');
    const applicants: Applicant[] = result.rows;
    res.json(applicants);
  } catch (error) {
    console.error('Error fetching applicants', error);
    res.status(500).json({ error: 'Error fetching applicants' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { username, email, password, admin } = req.body;

  if (typeof username !== 'string' || username.trim() === '' || !email) {
    return res.status(400).json({ error: 'Invalid applicant data' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO applicant (username, email, password,admin) VALUES ($1, $2, $3, $4 ) RETURNING *',
      [username, email, password, admin]
    );
    const createdApplicant: Applicant = result.rows[0];
    res.status(201).json(createdApplicant);
  } catch (error) {
    console.error('Error adding applicant', error);
    res.status(500).json({ error: 'Error adding applicant' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const applicantID = req.params.id;

  if (!uuidValidate(applicantID)) {
    return res.status(400).json({ error: 'Invalid applicant ID' });
  }

  try {
    await pool.query('DELETE FROM applicant WHERE id = $1', [applicantID]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting applicant', error);
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
    await pool.query(
      'UPDATE applicant SET username = $1, email = $2, password = $3, admin = $4 WHERE id = $5',
      [username, email, password, admin, applicantID]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating applicantID', error);
    res.status(500).json({ error: 'Error updating applicantID' });
  }
});

export default router;
