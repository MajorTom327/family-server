import { Families } from "~/models";
import { Users } from "~/models";

import logger from "~/lib/logger";

export class FamilyResolver {
  getFamily(id: string) {
    logger.info("FamilyResolver.getFamily", id);
    return Families.getFamily(id);
  }

  getOwner(id: string) {
    return Users.getUserFromFamily(id);
  }

  getFamilies(page?: number) {
    return Families.getFamilies(page);
  }

  createFamily(family: any) {
    logger.info("FamilyResolver.createFamily", family);
    return Families.createFamily(family);
  }
}

export default FamilyResolver;
