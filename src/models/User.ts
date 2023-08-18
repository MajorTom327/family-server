import { v4 as uuid } from "uuid";
import zod from "zod";

export const UserSchema = zod.object({
  id: zod.string(),

  email: zod.string().email(),
  password: zod.string(),
  familyId: zod.string().optional(),

  createdAt: zod.coerce.date(),
  updatedAt: zod.coerce.date(),
});

export const UserInputSchema = UserSchema.omit({
  id: true,

  familyId: true,
  createdAt: true,
  updatedAt: true,
});

export type IUser = zod.infer<typeof UserSchema>;
export type IInputUser = zod.infer<typeof UserInputSchema>;

export class UserModel {
  users: IUser[] = [];

  createUser(user: IInputUser) {
    const newUser = {
      ...UserInputSchema.parse(user),
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  getUser(id: string) {
    return this.users.find((user) => user.id === id) || null;
  }

  getUsers(page: number = 0) {
    const limit = 10;
    const startPage = page * limit;
    return this.users.slice(startPage, startPage + limit);
  }
}

export default UserModel;
