import { Request, Response } from "express";
import { uploadUserImageService } from "../../services/users";

const uploadUserImageController = async (req: Request, res: Response) => {
  const userID = req.user.id;
  const upload = await uploadUserImageService(req.file, userID);
  return res.status(200).json(upload);
};

export default uploadUserImageController;
