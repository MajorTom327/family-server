import { Families, Users } from "~/models";

import logger from "~/lib/logger";

export class UserResolver {
  getFamily(id: string) {
    const user = Users.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }

    console.log("user", user);

    if (!user.familyId) {
      return null;
    }

    return Families.getFamily(user.familyId);
  }
  constructor() {}

  getUser(id: string) {
    logger.info("UserResolver.getUser", id);
    return Users.getUser(id);
  }

  getUsers(page?: number) {
    return Users.getUsers(page);
  }

  createUser(user: any) {
    logger.info("UserResolver.createUser", user);
    return Users.createUser(user);
  }
}

export default UserResolver;
