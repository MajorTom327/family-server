import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type Client = {
  __typename?: "Client";
  createdAt: Scalars["Date"]["output"];
  email: Scalars["String"]["output"];
  externalId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  orders: Array<Order>;
  subscriptions: Array<Subscription>;
  updatedAt: Scalars["Date"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createClient: Client;
  createProduct: Product;
  createProject: Project;
};

export type MutationCreateClientArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  projectId: Scalars["String"]["input"];
};

export type MutationCreateProductArgs = {
  name: Scalars["String"]["input"];
  price: Scalars["Int"]["input"];
  projectId: Scalars["String"]["input"];
};

export type MutationCreateProjectArgs = {
  name: Scalars["String"]["input"];
};

export type Order = {
  __typename?: "Order";
  client: Client;
  createdAt: Scalars["Date"]["output"];
  externalId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  updatedAt: Scalars["Date"]["output"];
};

export type Product = {
  __typename?: "Product";
  createdAt: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  price: Scalars["Int"]["output"];
  updatedAt: Scalars["Date"]["output"];
};

export type Project = {
  __typename?: "Project";
  clients: Array<Client>;
  createdAt: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  products: Array<Product>;
  updatedAt: Scalars["Date"]["output"];
};

export type Query = {
  __typename?: "Query";
  clients: Array<Client>;
  projects: Array<Project>;
};

export type Subscription = {
  __typename?: "Subscription";
  cancelAtPeriodEnd: Scalars["Boolean"]["output"];
  createdAt: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  lastExecution?: Maybe<Scalars["Date"]["output"]>;
  nextExecution?: Maybe<Scalars["Date"]["output"]>;
  orders: Array<Order>;
  updatedAt: Scalars["Date"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Client: ResolverTypeWrapper<Client>;
  Date: ResolverTypeWrapper<Scalars["Date"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  Product: ResolverTypeWrapper<Product>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  Client: Client;
  Date: Scalars["Date"]["output"];
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Mutation: {};
  Order: Order;
  Product: Product;
  Project: Project;
  Query: {};
  String: Scalars["String"]["output"];
  Subscription: {};
};

export type ClientResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Client"] = ResolversParentTypes["Client"],
> = {
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  externalId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes["Order"]>, ParentType, ContextType>;
  subscriptions?: Resolver<
    Array<ResolversTypes["Subscription"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createClient?: Resolver<
    ResolversTypes["Client"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateClientArgs, "email" | "name" | "projectId">
  >;
  createProduct?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProductArgs, "name" | "price" | "projectId">
  >;
  createProject?: Resolver<
    ResolversTypes["Project"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectArgs, "name">
  >;
};

export type OrderResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Order"] = ResolversParentTypes["Order"],
> = {
  client?: Resolver<ResolversTypes["Client"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  externalId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Product"] = ResolversParentTypes["Product"],
> = {
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Project"] = ResolversParentTypes["Project"],
> = {
  clients?: Resolver<Array<ResolversTypes["Client"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  products?: Resolver<
    Array<ResolversTypes["Product"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  clients?: Resolver<Array<ResolversTypes["Client"]>, ParentType, ContextType>;
  projects?: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  cancelAtPeriodEnd?: SubscriptionResolver<
    ResolversTypes["Boolean"],
    "cancelAtPeriodEnd",
    ParentType,
    ContextType
  >;
  createdAt?: SubscriptionResolver<
    ResolversTypes["Date"],
    "createdAt",
    ParentType,
    ContextType
  >;
  id?: SubscriptionResolver<
    ResolversTypes["ID"],
    "id",
    ParentType,
    ContextType
  >;
  lastExecution?: SubscriptionResolver<
    Maybe<ResolversTypes["Date"]>,
    "lastExecution",
    ParentType,
    ContextType
  >;
  nextExecution?: SubscriptionResolver<
    Maybe<ResolversTypes["Date"]>,
    "nextExecution",
    ParentType,
    ContextType
  >;
  orders?: SubscriptionResolver<
    Array<ResolversTypes["Order"]>,
    "orders",
    ParentType,
    ContextType
  >;
  updatedAt?: SubscriptionResolver<
    ResolversTypes["Date"],
    "updatedAt",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Client?: ClientResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};
