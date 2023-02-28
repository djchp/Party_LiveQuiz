import mongoose from "mongoose";
import { User, AccountType } from "../../users/schema/user.schema";

const objectId = new mongoose.Types.ObjectId("sdfgg35445dfgdfg")

export const UserMock = (): User => {
    return {
        _id: objectId,
        email: "test@test.com",
        name: "test",
        password: "test",
        accountType: AccountType.User
    }
}