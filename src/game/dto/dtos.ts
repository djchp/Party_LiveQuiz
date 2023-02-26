import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class createGameDto {
    @IsString()
    hostId: Types.ObjectId

    @IsString()
    quizId: Types.ObjectId

    @IsNumber()
    gamePin: number

    @IsBoolean()
    isLive: boolean

}
export class addPLayer {
    playerId: Types.ObjectId
}