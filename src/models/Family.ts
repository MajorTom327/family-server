import { v4 as uuid } from "uuid";
import zod from "zod";

export const FamilySchema = zod.object({
  id: zod.string(),

  ownerId: zod.string(),

  createdAt: zod.coerce.date(),
  updatedAt: zod.coerce.date(),
});

export const FamilyInputSchema = FamilySchema.omit({
  id: true,

  createdAt: true,
  updatedAt: true,
});

export type IFamily = zod.infer<typeof FamilySchema>;
export type IInputFamily = zod.infer<typeof FamilyInputSchema>;

export class FamilyModel {
  families: IFamily[] = [];

  createFamily(family: IInputFamily) {
    const newFamily = {
      ...FamilyInputSchema.parse(family),
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.families.push(newFamily);

    return newFamily;
  }

  getFamily(id: string) {
    return this.families.find((family) => family.id === id) || null;
  }

  getFamilies(page: number = 0) {
    const limit = 10;
    const startPage = page * limit;
    return this.families.slice(startPage, startPage + limit);
  }
}

export default FamilyModel;
