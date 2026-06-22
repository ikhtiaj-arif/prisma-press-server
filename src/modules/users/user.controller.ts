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
  }
};

export const userController = {
  userRegister,
};
