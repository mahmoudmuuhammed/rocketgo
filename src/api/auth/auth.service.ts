import crypto from "crypto";
import bcrypt from "bcrypt";
import db from "../../client";
import logger from "../../modules/logger.mod";
import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
import { SignupDto, LoginDto } from "./dtos";

async function createUser(signupDto: SignupDto) {
  try {
    const checkUser = await db.user.findFirst({
      where: {
        email: signupDto.email,
      },
    });

    if (checkUser) throw new BadRequestError("Email already exist", "email");

    const user = await db.user.create({
      data: {
        ...signupDto,
        password: await hashPassword(signupDto.password),
      },
    });

    return { status: "User Created!", user };
  } catch (error) {
    logger.error("Error on createUser *Auth*", error);
    throw error;
  }
}

async function logUser(loginDto: LoginDto) {
  try {
    const user = await db.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!user)
      throw new NotFoundError("Email or password incorrect", "login email");

    const isPassCorrect = await comparePassword(
      user.password,
      loginDto.password
    );

    if (!isPassCorrect)
      throw new NotFoundError("Email or password incorrect", "login password");

    return { status: "Found User", user };
  } catch (error) {
    logger.error("Error on login *Auth*", error);
    throw error;
  }
}
// hepler functions
function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    const salt = crypto.randomBytes(8).toString("hex");
    crypto.scrypt(password, salt, 64, async (error, derivedKey) => {
      if (error) reject("Error when hashing the password");
      const hashed = await bcrypt.hash(derivedKey.toString("hex"), 10);
      resolve(`${salt}:${hashed}`);
    });
  });
}

function comparePassword(hashedPassword: string, plaintext: string) {
  return new Promise<boolean>((resolve, reject) => {
    const [salt, key] = hashedPassword.split(":");
    crypto.scrypt(plaintext, salt, 64, (error, derivedKey) => {
      if (error) reject("Error when compare password");
      const compare = bcrypt.compare(derivedKey.toString("hex"), key);
      resolve(compare);
    });
  });
}

function generateAccessToken() {}

function generateRefreshToken() {}

export default { createUser, logUser };
