// import { ApolloServer } from "apollo-server-micro";
// import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from "next";
// import { readFileSync } from 'fs';
// import { join } from 'path';

// const prisma = new PrismaClient();

// // GraphQLスキーマ定義
// const typeDefs = `
//   type Subtask {
//     name: String
//     deadline: String
//     completed: Boolean
//     responsible: String
//   }

//   type Task {
//     title: String
//     subtasks: [Subtask]
//   }

//   type Query {
//     tasks: [Task]
//   }
// `;

// // リゾルバ定義
// const resolvers = {
//   Query: {
//     tasks: async () => {
//       return await prisma.task.findMany({
//         include: {
//           subtasks: true
//         }
//       });
//     }
//   }
// };

// const apolloServer = new ApolloServer({ typeDefs, resolvers });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// let apolloServerHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

// async function getApolloServerHandler() {
//   if (!apolloServerHandler) {
//     await apolloServer.start();
//     apolloServerHandler = apolloServer.createHandler({
//       path: "/api/graphql",
//     });
//   }
//   return apolloServerHandler;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const handler = await getApolloServerHandler();
//   return handler(req, res);
// }