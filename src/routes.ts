import { Router, Request, Response } from 'express';
import pool from './db';

const router = Router();

interface Applicant {
  id: number;
  name: string;
  admin: boolean;
}

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the CRUD App!');
});

router.get('/awesome/applicant', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM applicant');
    const applicants: Applicant[] = result.rows;
    res.json(applicants);
  } catch (error) {
    console.error('Error fetching applicants', error);
    res.status(500).json({ error: 'Error fetching applicants' });
  }
});

router.post('/awesome/applicant', async (req: Request, res: Response) => {
  const { name, admin } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid applicant data' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO applicant (name, admin) VALUES ($1, $2 ) RETURNING *',
      [name, admin]
    );
    const createdApplicant: Applicant = result.rows[0];
    res.status(201).json(createdApplicant);
  } catch (error) {
    console.error('Error adding applicant', error);
    res.status(500).json({ error: 'Error adding applicant' });
  }
});

router.delete('/awesome/applicant/:id', async (req: Request, res: Response) => {
  const applicantID = parseInt(req.params.id, 10);

  if (isNaN(applicantID)) {
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

router.put('/awesome/applicant/:id', async (req: Request, res: Response) => {
  const applicantID = parseInt(req.params.id, 10);
  const { name, admin } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid applicant data' });
  }

  try {
    await pool.query(
      'UPDATE applicant SET name = $1, admin = $2 WHERE id = $3',
      [name, admin, applicantID]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating applicantID', error);
    res.sendStatus(500).json({ error: 'Error updating applicantID' });
  }
});

export default router;
