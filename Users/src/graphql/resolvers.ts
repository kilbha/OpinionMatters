import prisma from "../db/prisma";
import { User } from "../models/User";
const { ApolloError } = require("apollo-server-errors");
import redisClient from "../redis/redis";

export const resolvers = {
  queries: {
    getAllUsers: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
    getUserByEmail: async (parent: any, args: { email: string }) => {
      try {
        const { email } = args;
        const cachedUser = await redisClient.get(`user:${email}`);
        if (cachedUser) {
          return JSON.parse(cachedUser);
        }
        const user = await prisma.user.findFirst({
          where: { email: email },
        });
        if (!user) {
          await redisClient.set(`user:${email}`, JSON.stringify(user));
        }
        return user || null;
      } catch (error) {
        return new Error("An Error occured");
        // console.error(error);
      }
    },
  },
  mutations: {
    createUser: async (parent: any, args: { user: User }) => {
      const { user } = args;
      const createdUser = await prisma.user.create({
        data: user,
      });
      return createdUser;
    },
  },
};
