import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../abstract_repo/abstract.schema';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
export class PlayerStats extends AbstractDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  playerId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Game' })
  gameId: Types.ObjectId;

  @Prop({ type: Number })
  score: number;

  @Prop({
    type: [
      {
        questionIndex: { type: Number },
        answered: { type: Boolean, default: false },
        answer: { type: String },
      },
    ],
  })
  answers: { questionIndex: number; answered: boolean; answer: string }[];
}

export const PlayerStatsSchema = SchemaFactory.createForClass(PlayerStats);
