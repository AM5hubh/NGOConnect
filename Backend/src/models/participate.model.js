import mongoose,{Schema} from 'mongoose';

const participationSchema = new Schema({
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'attended', 'no-show'],
      default: 'pending'
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    notes: String,
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String
    },
    attendanceMarked: {
      type: Boolean,
      default: false
    }
  });

  export const Participation = mongoose.model('Participation', participationSchema);