// models/Form.ts
import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  schema: { type: mongoose.Schema.Types.Mixed, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.models.Form || mongoose.model('Form', FormSchema);