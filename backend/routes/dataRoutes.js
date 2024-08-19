import { Router } from 'express';
import { find } from '../models/datamodel.js'; 

const router = Router();


router.get('/', async (req, res) => {
  try {
    const data = await find(); // Fetch all data
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET filtered data
router.get('/filter', async (req, res) => {
  const filters = req.query; // Get filters from query parameters
  try {
    const data = await find(filters); // Fetch filtered data
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
