import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Collaborator } from './collaborator.schema';

@Schema()
export class Team extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Collaborator' }], default: [] })
  collaborators: Collaborator[];

  @Prop({ default: true })
  active: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
