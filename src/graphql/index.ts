import { ApolloServer } from "@apollo/server";
import { always } from "ramda";
import { getEnv } from "~/config";

import dateScalar from "./Scalar/DateScalar";
import type { Resolvers } from "./__generated__/graphql";
import FamilyResolver from "./resolvers/FamilyResolver";
import UserResolver from "./resolvers/UserResolver";
// import { ClientResolver } from "./resolvers/ClientResolver";
// import ProjectResolver from "./resolvers/ProjectResolver";
import typeDefs from "./schema.graphql";

export type GraphQLContext = {};

export const resolvers: Resolvers = {
  Query: {
    user: (_, { id }) => new UserResolver().getUser(id),
    users: (_, { page }) => new UserResolver().getUsers(page || 0),
    family: (_, { id }) => new FamilyResolver().getFamily(id),
  },
  // Project: {
  //   clients: always([]),
  //   // clients: (parent) => new ClientResolver().getProjectClients(parent.id),
  //   products: always([]),
  // },
  // Client: {
  //   orders: always([]),
  //   subscriptions: always([]),
  // },

  User: {
    family: (parent) => new UserResolver().getFamily(parent.id),
  },

  Family: {
    owner: (parent) => new FamilyResolver().getOwner(parent.id),
    members: () => [],
  },

  Mutation: {
    createUser: (_, { userInput }) => new UserResolver().createUser(userInput),
    createFamily: (_, { familyInput }) =>
      new FamilyResolver().createFamily(familyInput),
    // createProject: (parents, { name }) =>
    //   new ProjectResolver().createProject(name),
    // createClient: (parents, { name, email, projectId }) =>
    //   new ClientResolver().createClient({ name, email, projectId }),
  },
  Date: dateScalar,
};

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  introspection: getEnv("NODE_ENV") !== "production",
});

export default server;
