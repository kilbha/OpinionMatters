"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const { ApolloError } = require("apollo-server-errors");
const redis_1 = __importDefault(require("../redis/redis"));
exports.resolvers = {
    queries: {
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield prisma_1.default.user.findMany();
            return users;
        }),
        getUserByEmail: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { email } = args;
                const cachedUser = yield redis_1.default.get(`user:${email}`);
                if (cachedUser) {
                    return JSON.parse(cachedUser);
                }
                const user = yield prisma_1.default.user.findFirst({
                    where: { email: email },
                });
                if (!user) {
                    yield redis_1.default.set(`user:${email}`, JSON.stringify(user));
                }
                return user || null;
            }
            catch (error) {
                return new Error("An Error occured");
                // console.error(error);
            }
        }),
    },
    mutations: {
        createUser: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const createdUser = yield prisma_1.default.user.create({
                data: user,
            });
            return createdUser;
        }),
    },
};
