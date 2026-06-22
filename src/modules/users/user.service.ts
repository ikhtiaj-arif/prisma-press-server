import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";

interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
}

const registerUserIntoDB = async (payload: IRegisterUserPayload) => {
  console.log("service");
  try {
    const { email, password, name, profilePhoto } = payload;
    const isUserExists = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserExists) {
      throw new Error("User with this email already exists ");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        userId: createdUser.id,
        profilePhoto,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: createdUser.id,
        email: createdUser.email || email,
      },
      include: {
        profile: true,
      },
      omit: {
        password: true,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const userServices = {
  registerUserIntoDB,
};
