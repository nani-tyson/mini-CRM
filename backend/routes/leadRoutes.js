import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
// ADD THE NEW CONTROLLER FUNCTIONS TO THE IMPORT LIST
import {
  addLead,
  getLeadsForCustomer,
  getLeadById,
  updateLead,
  deleteLead,
} from '../controllers/leadController.js';

const router = express.Router({ mergeParams: true });

router.route('/')
  .post(protect, addLead)
  .get(protect, getLeadsForCustomer);

// ACTIVATE THIS ROUTE FOR SINGLE LEAD OPERATIONS
router.route('/:leadId')
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, deleteLead);

export default router;