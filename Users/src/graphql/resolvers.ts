import prisma from "../db/prisma";
import { User } from "../models/User";
const { ApolloError } = require("apollo-server-errors");
import redisClient from "../redis/redis";
import { signupInput } from "../models/signupInput";
import emailService from "../services/emailService";
import Validators from "../services/validator";

const emailservice = new emailService();
const validator = new Validators();

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
    createUser: async (
      parent: any,
      args: {
        email: string;
        password: string;
      }
    ) => {
      try {
        const { email, password } = args;
        //EMAIL VALIDATION
        if (!validator.is_valid_email(email)) {
          return {
            errors: {
              message: "Please provide valild email id",
              status_code: 400,
            },
            user: null,
          };
        }

        const ExistingUser = await prisma.user.findUnique({ where: { email } });
        if (ExistingUser) {
          return {
            errors: { message: "Email Already Exists", status_code: 400 },
            user: null,
          };
        }
        const createdUser = await prisma.user.create({
          data: { email, password },
        });
        return { user: createdUser, errors: null };
      } catch (error) {
        throw new Error();
      }
    },
    send_signup_email: async (parent: any, args: { input: signupInput }) => {
      const { input } = args;
      const { toEmail, subject, html, role, exp } = input;
      let messageId = await emailservice.send_email(
        [toEmail],
        html,
        subject,
        role,
        exp
      );

      if (messageId) {
        return messageId;
      } else {
        throw new Error("Error in sending signup email");
      }

      return "Hi";
    },
  },
};
