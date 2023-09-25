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
const nodemailer_1 = __importDefault(require("nodemailer"));
const utilsService_1 = __importDefault(require("./utilsService"));
class emailService {
    constructor() {
        this.send_email = (to, html, subject, role, exp) => __awaiter(this, void 0, void 0, function* () {
            // Create a promise to wrap the sendMail callback
            return new Promise((resolve, reject) => {
                var utilsInstance = new utilsService_1.default();
                const token = utilsInstance.get_jwt_token(to, role, exp);
                const transporter = nodemailer_1.default.createTransport({
                    host: process.env.EmailHost,
                    port: 465,
                    auth: {
                        user: process.env.FromEmail,
                        pass: process.env.Password,
                    },
                    secure: true,
                });
                const details = {
                    html: `http://localhost:4200/signup?token=${token}`,
                    from: process.env.FromEmail,
                    to: to,
                    subject: subject,
                };
                transporter.sendMail(details, (error, info) => {
                    if (error) {
                        console.error("Error sending an email", error.message);
                        reject(error); // Reject the promise with the error
                    }
                    else {
                        resolve(info.messageId); // Resolve the promise with the messageId
                    }
                });
            });
        });
    }
}
exports.default = emailService;
