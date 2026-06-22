import { Request, Response } from "express";
import httpStatus from "http-status";
import { userServices } from "./user.service";

const userRegister = async (req: Request, res: Response) => {
  console.log("controller");
  try {
    const payload = req.body;

    const result = await userServices.registerUserIntoDB(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: {
        user: result,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to register user",
      error: (error as Error).message,
    });
  }
};

export const userController = {
  userRegister,
};
