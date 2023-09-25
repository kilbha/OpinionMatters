"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class utils {
    constructor() {
        this.get_jwt_token = (email, role, exp) => {
            const secret = process.env.SecretKey;
            const userData = { email: email, role: role };
            const token = jsonwebtoken_1.default.sign(userData, secret, { expiresIn: exp });
            return token;
        };
    }
    get_utc_offset() {
        const offset = new Date().getTimezoneOffset();
        return offset / -60;
    }
}
exports.default = utils;
