import * as mongoose from 'mongoose';

export const MachineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    machineModel: { type: String, required: true },
    manufacturingDate: { type: Date, required: true },
    serialNumber: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    image: { type: String, required: false },

    create_at: {
      type: Date,
      default: Date.now,
      select: false,
    },

    update_at: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true, 
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.create_at;  
        delete ret.update_at;  
      },
    },
  }
);
