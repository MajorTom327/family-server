import { ApolloServer } from "@apollo/server";
import { always } from "ramda";
import { getEnv } from "~/config";

import { Resolvers } from "~/graphql/__generated__/graphql";

import dateScalar from "./Scalar/DateScalar";
// import { ClientResolver } from "./resolvers/ClientResolver";
// import ProjectResolver from "./resolvers/ProjectResolver";
import typeDefs from "./schema.graphql";

export type GraphQLContext = {};

export const resolvers: Resolvers = {
  Query: {
    user: () => null,
    users: () => [],
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

  Mutation: {
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
