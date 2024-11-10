import * as mongoose from 'mongoose';

export const MaintenanceSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true }, 
    openingDate: { type: Date, required: true },
    completionDeadline: { type: Date, required: true },
    responsibleTeam: { type: String, required: true },
    status: {
      type: String,
      enum: ['Em Andamento', 'Pendente', 'Concluído', 'Cancelado'],
      default: 'Pendente',
    },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ['Baixa', 'Média', 'Alta'],
      default: 'Média',
    },
    maintenanceType: {
      type: String,
      enum: ['Preventiva', 'Corretiva'],
      required: true,
    },
    files: [{ type: String }],
    comments: { type: String, default: '' },  
    stockItems: [{ type: String, default: [] }], 
    services: [{ type: String, default: [] }],  
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
