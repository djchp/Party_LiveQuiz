import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/abstract_repo/abstract.schema';

export enum AccountType {
  Admin = 'Admin',
  User = 'User',
}

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop({ type: String, required: true, unique: true, minlength: 3 })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, enum: AccountType })
  accountType: AccountType;
}

export const UserSchema = SchemaFactory.createForClass(User);
