import { Router } from "express";
import { envs } from "../../config";
import { FileUpController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares";
import { TypeMiddleware } from "../middlewares/type.middleware";
envs;

export class FileUploadRoutes {
  static get routes(): Router {
    const controller = new FileUpController(new FileUploadService());
    const router = Router();
    const validTypes = ["users", "products", "categories"];
    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(validTypes));
    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.uploadMultipleFiles);

    return router;
  }
}
