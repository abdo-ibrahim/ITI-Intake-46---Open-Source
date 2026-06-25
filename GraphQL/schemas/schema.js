import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLError } from "graphql";
import { User, Company } from "../database/models.js";

const companyType = new GraphQLObjectType({
  name: "company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    users: {
      type: new GraphQLList(userType),
      resolve: async (parent, args, context) => {
        return await context.usersByCompanyLoader.load(parent.id);
      },
    },
  }),
});

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLFloat },
    companies: {
      type: new GraphQLList(companyType),
      resolve: async (parent, args, context) => {
        if (!parent.companies || parent.companies.length === 0) return [];
        return await context.companyLoader.loadMany(parent.companies);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "query_test",
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async () => await User.find(),
    },
    company: {
      type: new GraphQLList(companyType),
      resolve: async () => await Company.find(),
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "mutation_test",
  fields: {
    // --- User CRUD ---
    createUser: {
      type: userType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        age: { type: GraphQLFloat },
        companies: { type: new GraphQLList(GraphQLID) },
      },
      resolve: async (parent, args) => {
        return await User.create(args);
      },
    },
    updateUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLFloat },
        companies: { type: new GraphQLList(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const { id, ...updateData } = args;
        return await User.findByIdAndUpdate(id, updateData, { new: true });
      },
    },
    deleteUser: {
      type: userType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => {
        return await User.findByIdAndDelete(args.id);
      },
    },

    // --- Company CRUD ---
    createCompany: {
      type: companyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        return await Company.create(args);
      },
    },
    updateCompany: {
      type: companyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const { id, ...updateData } = args;
        return await Company.findByIdAndUpdate(id, updateData, { new: true });
      },
    },
    deleteCompany: {
      type: companyType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (parent, args) => {
        return await Company.findByIdAndDelete(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default schema;
