import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export class Service extends Document {
  name: string;
  supplierName: ObjectId;
  description: string;
}
