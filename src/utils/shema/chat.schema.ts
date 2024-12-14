/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Room } from './rooms.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Chat {
  @Prop({ required: true })
  content: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  sender_id: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Room.name,
  })
  room_id: Room;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
