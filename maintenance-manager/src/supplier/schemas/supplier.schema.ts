import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, primary: true },
    type: { type: String, enum: ['part', 'service'], required: true },
    address: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    website: { type: String },
    notes: { type: String },
    serviceDescription: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret.id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
