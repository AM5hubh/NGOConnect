import mongoose,{Schema} from 'mongoose';

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // ngoId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'NGO',
  //   required: true,
  // },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Education', 'Healthcare', 'Environment', 'Social Welfare', 'Other'],
    required: true,
  },
  requiredVolunteers: {
    type: Number,
    required: false,
  },
  registeredVolunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  skills: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  images: [{
    type: String // URLs to event images
  }],
  contactPerson: {
    name: String,
    email: String,
    phone: String
  }
});

export const Event = mongoose.model('Event', eventSchema);