import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';
import LeadRouter from './leadRoutes.js'

const router = express.Router();

// Chain GET and POST requests for the root route '/'
router.route('/')
  .get(protect, getCustomers)
  .post(protect, createCustomer);

// Chain GET, PUT, and DELETE for routes with an ID parameter '/:id'
router.route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

// Integrate LeadRoutes for handling leads related to a specific customer
router.use('/:customerId/leads', LeadRouter);

export default router;
