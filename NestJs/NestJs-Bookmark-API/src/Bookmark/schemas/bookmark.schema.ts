import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [String] })
  tags: string[];
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
