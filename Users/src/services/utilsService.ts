import jwt from "jsonwebtoken";

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
}

export default utils;
