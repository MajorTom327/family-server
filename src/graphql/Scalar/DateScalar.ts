import { GraphQLScalarType, Kind } from "graphql";
import { DateTime } from "luxon";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return DateTime.fromJSDate(value).toISO();
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "string") {
      const date = DateTime.fromISO(value);
      if (date.isValid) {
        return date.toJSDate();
      }
    }
    throw new Error("GraphQL Date Scalar parser expected a valid ISO string");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // Convert hard-coded AST string to integer and then to Date
      const date = DateTime.fromISO(ast.value);
      if (date.isValid) {
        return date.toJSDate();
      }
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export default dateScalar;
