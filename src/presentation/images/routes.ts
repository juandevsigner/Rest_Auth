import { Router } from "express";
import { ImagesController } from "./controller";

export class ImageRoutes {
  static get routes(): Router {
    const controller = new ImagesController();
    const router = Router();
    router.get("/:type/:img", controller.getImage);
    return router;
  }
}
