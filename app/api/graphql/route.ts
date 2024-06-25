import { ApolloServer } from "@apollo/server";
import { PrismaClient } from '@prisma/client';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { QueryResolvers, MutationResolvers, Resolvers, Task } from "@/graphql/generated/types";
// import { NextRequest, NextResponse } from "next/server";
// import { DateTime } from "@/graphql/scalers/DateTime";

// GraphQLスキーマ定義
const typeDefs = `
scalar DateTime

type User {
  id: ID!
  username: String!
  email: String!
}

type Subtask {
  id: ID!
  name: String!
  deadline: DateTime!
  description: String!
  completed: Boolean!
  responsible: User!
}

type Task {
  id: ID!
  title: String!
  subtasks: [Subtask!]!
}

type Query {
  tasks: [Task!]!
}

type Mutation {
  updateSubtaskCompleted(id: ID!, completed: Boolean!): Subtask!
}
`;

const prisma = new PrismaClient();

// リゾルバ定義
const queryResolvers: QueryResolvers = {
  tasks: async (_parent, _args, _context, _info) => {
    const tasks: Task[] = await prisma.task.findMany({
      include: {
        subtasks: {
          include: {
            responsible: true
          }
        }
      }
    });
    return tasks.map(task => ({
      ...task,
      subtasks: task.subtasks.map(subtask => ({
        ...subtask,
        deadline: subtask.deadline.toISOString(),
        description: subtask.description,
      })),
    }));
  }
};


const mutationResolvers: MutationResolvers = {
  updateSubtaskCompleted: async (_parent, { id, completed }) => {
    const updatedSubtask = await prisma.subtask.update({
      where: { id: parseInt(id) },
      data: { completed },
      include: { responsible: true }
    });
    return {
      ...updatedSubtask,
      deadline: updatedSubtask.deadline.toISOString(),
    };
  }
};

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };