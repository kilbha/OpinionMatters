import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

class utils {
  public get_utc_offset() {
    const offset: number = new Date().getTimezoneOffset();
    return offset / -60;
  }

  get_jwt_token = (email: any, role: string, exp: string): string => {
    const secret = process.env.SecretKey!;
    const userData = { email: email, role: role };
    const token = jwt.sign(userData, secret, { expiresIn: exp });
    return token;
  };

  hash_password = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    return hash_password;
  };
}

export default utils;
