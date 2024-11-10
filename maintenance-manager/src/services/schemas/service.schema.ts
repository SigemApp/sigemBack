import * as mongoose from 'mongoose';

export const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    supplierName: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
