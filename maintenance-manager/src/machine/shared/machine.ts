import { Document, model } from 'mongoose';


export class Machine extends Document {
  name: string;
  type: string;
  machineModel: string;
  manufacturingDate: Date;
  serialNumber: string;
  location: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

