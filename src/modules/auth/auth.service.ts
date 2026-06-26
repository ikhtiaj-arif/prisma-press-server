import bcrypt from "bcryptjs";
import { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../utils/jwt";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  //   const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
  //     expiresIn: config.jwt_access_expires_in,
  //   } as SignOptions);

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    } as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    {
      expiresIn: config.jwt_refresh_expires_in,
    } as SignOptions,
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  const decodedVerifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret,
  );
  if (!decodedVerifiedRefreshToken) {
    throw new Error("Invalid refresh token");
  }
  const { id } = decodedVerifiedRefreshToken.data as { id: string };

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (user.activeStatus === "BLOCKED") {
    throw new Error("User is blocked");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    } as SignOptions,
  );

  return { accessToken };
};
export const authService = {
  loginUser,
  refreshToken,
};
