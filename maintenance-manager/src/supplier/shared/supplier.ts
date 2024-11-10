import { Document } from 'mongoose';

export class Supplier extends Document {
  name: string;
  code: string;
  type: 'part' | 'service';
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  notes?: string;
  serviceDescription?: string;
}
