import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/AppError";

const uploadUserImageService = async (file: Express.Multer.File, userID: string): Promise<object> => {
  const upload = await cloudinary.uploader.upload(file!.path, (error, result) => result);

  fs.unlink(file!.path, (error) => {
    if (error) {
      throw new AppError(String(error));
    }
  });

  const userRepository = AppDataSource.getRepository(User);
  const uploadImage = await userRepository.update(
    { id: userID },
    {
      image: upload.public_id,
    }
  );

  return { message: "Altered image" };
};

export default uploadUserImageService;
