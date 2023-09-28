"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
class validators {
    constructor() {
        this.is_valid_email = (email) => {
            return validator_1.default.isEmail(email);
        };
    }
}
exports.default = validators;
