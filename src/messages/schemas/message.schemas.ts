import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.__v;
      delete ret._id;
      delete ret.updatedAt;
    },
  },
})
export class Room extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  text: string;

  @Prop({ required: true, type: String })
  room: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
