import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";

interface UserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const authResolvers = {
  signup: async (parent: any, args: UserInfo, { prisma }: any) => {
    const isExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (isExist) {
      return {
        userError: "User already exists!",
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 12);
    args.password = hashedPassword;
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: args.password,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHelper.generateToken(
      { userId: newUser.id },
      config.jwt.secret as string
    );

    return {
      userError: null,
      token,
    };
  },

  signin: async (parent: any, args: any, { prisma }: any) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (!existingUser) {
      return {
        userError: "User not found!",
        token: "null",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      args.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return {
        userError: "Incorrect Password!",
        token: "null",
      };
    }

    const token = await jwtHelper.generateToken(
      { userId: existingUser.id },
      config.jwt.secret as string
    );

    return {
      userError: null,
      token,
    };
  },
};
