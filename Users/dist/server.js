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
const server_1 = require("./graphql/server");
const dotenv_1 = __importDefault(require("dotenv"));
const PORT = process.env.port || 4000;
dotenv_1.default.config();
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield (0, server_1.startGraphqlServer)();
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});
startApp();
