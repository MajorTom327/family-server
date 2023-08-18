/**
 * Config for generating the Graphql schema and types
 */
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/schema.graphql",
  generates: {
    "./src/graphql/__generated__/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
