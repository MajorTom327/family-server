import { Users } from "~/models";

import logger from "~/lib/logger";

export class UserResolver {
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
