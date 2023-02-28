import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/abstract_repo/abstract.schema';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
export class Game extends AbstractDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  hostId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Quiz', required: true })
  quizId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  gamePin: number;

  @Prop({ type: Boolean, default: false })
  isLive: boolean;

  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  playerList: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'PlayerStats' }],
    default: [],
  })
  playerStatsList: { playerStatsIds: Types.ObjectId }[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
