import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  pnrNumber: { type: String, required: true },
  trainNumber: { type: String, required: true },
  trainName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  journeyDate: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  seatNumber: { type: String, required: true },
  class: { type: String, enum: ['Sleeper', '3A', '2A', '1A', 'General', 'CC'], required: true },
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'VERIFIED', 'AVAILABLE', 'BOOKED', 'REJECTED'], required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  buyerId: { type: String },
  buyerName: { type: String },
  buyerPhone: { type: String },
  passengerDetails: {
    name: String,
    age: Number,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  },
  createdAt: { type: Date, default: Date.now },
  verifiedAt: { type: Date },
  bookedAt: { type: Date },
});

export default mongoose.model('Ticket', ticketSchema);
