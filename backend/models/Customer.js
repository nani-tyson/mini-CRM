import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This creates a reference to the User model
    },
    name: {
      type: String,
      required: [true, 'Please add a customer name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      // Note: We are not making this unique globally, as different users
      // might have customers with the same email.
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;
