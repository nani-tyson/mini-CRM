import Customer from '../models/Customer.js';

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = new Customer({
      user: req.user.id, // From protect middleware
      name,
      email,
      phone,
      address,
    });

    const createdCustomer = await customer.save();
    res.status(201).json(createdCustomer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating customer', error: error.message });
  }
};

// @desc    Get all customers for a user
// @route   GET /api/customers
// @access  Private
export const getCustomers = async (req, res) => {
  try {
    // Find customers that belong to the logged-in user
    const customers = await Customer.find({ user: req.user.id });
    res.json(customers);
  } catch (error) {
     res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single customer by ID
// @route   GET /api/customers/:id
// @access  Private
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // *** SECURITY CHECK ***
    // Ensure the logged-in user owns this customer
    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
export const updateCustomer = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // *** SECURITY CHECK ***
    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true, // Run schema validators
    });
    
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating customer', error: error.message });
  }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // *** SECURITY CHECK ***
    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await customer.deleteOne();
    
    res.json({ message: 'Customer removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
