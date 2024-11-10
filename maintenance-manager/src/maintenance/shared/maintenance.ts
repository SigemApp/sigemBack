import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export class Maintenance extends Document {
  orderNumber: string;
  machine: ObjectId; 
  openingDate: Date;
  completionDeadline: Date;
  responsibleTeam: string;
  status: 'Em Andamento' | 'Pendente' | 'Concluído' | 'Cancelado';
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  maintenanceType: 'Preventiva' | 'Corretiva';
  files: string[];
  comments: string;
  stockItems: string[];
  services: string[];
}
