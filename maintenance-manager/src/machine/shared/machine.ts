import { Document } from 'mongoose';

export class Machine extends Document {
  name: string;
  type: string;
  machineModel: string;
  manufacturingDate: Date;  
  serialNumber: string;
  location: string;
  image?: string;
  maintenances: string[];  
  createdAt?: Date;
  updatedAt?: Date;
}
