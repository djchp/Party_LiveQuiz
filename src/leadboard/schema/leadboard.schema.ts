import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/abstract_repo/abstract.schema';
import { Schema as MongooseSchema, Types } from 'mongoose';
@Schema()
export class Leadboard extends AbstractDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Game' })
  gameId: Types.ObjectId;

  @Prop({
    type: [
      {
        playerStatsIds: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'PlayerStats',
        },
      },
    ],
    default: [],
  })
  playerStatsList: { playerStatsIds: Types.ObjectId }[];

  @Prop({
    type: [
      {
        questionIndex: { type: Number },
        leadboardList: [
          {
            playerIds: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
            playerCorrectAnswers: { type: Number },
          },
        ],
      },
    ],
    default: [{ questionIndex: 0, leadboardList: [] }],
  })
  afterQuestionLeadboard: {
    questionIndex: number;
    leadboardList: {
      playerIds: Types.ObjectId;
      playerCorrectAnswers: Number;
    }[];
  }[];
}

export const LeadboardSchema = SchemaFactory.createForClass(Leadboard);
