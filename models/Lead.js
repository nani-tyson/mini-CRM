import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title for the lead'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Contacted', 'Converted', 'Lost'], // Pre-defined list of statuses
      default: 'New',
    },
    value: {
      type: Number,
      required: [true, 'Please add an estimated value for the lead'],
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Lead = mongoose.model('Lead', LeadSchema);
export default Lead;
