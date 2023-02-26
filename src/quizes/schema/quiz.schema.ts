import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../abstract_repo/abstract.schema';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
export class Quiz extends AbstractDocument {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  desc: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  authorId: Types.ObjectId;

  @Prop({ type: String, required: true })
  authorName: string;

  @Prop({ type: Number, default: 0 })
  numOfQuestions: number;

  @Prop({
    type: [
      {
        idx: { type: Number },
        question: { type: String },
        possAnswers: [
          {
            idx: { type: Number },
            content: { type: String },
            isCorrect: { type: Boolean },
          },
        ],
      },
    ],
  })
  questionList: {
    idx: number;
    question: string;
    possAnswers: { idx: number; content: string; isCorrect: boolean }[];
  }[];
}
export const QuizSchema = SchemaFactory.createForClass(Quiz);
