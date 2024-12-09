import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Collaborator extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({ default: true })
  available: boolean;
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);
