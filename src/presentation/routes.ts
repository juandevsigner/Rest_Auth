import { Router } from "express";
import {
  FileUploadRoutes,
  ProductRoutes,
  CategoryRoutes,
  AuthRoutes,
  ImageRoutes,
} from "./";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/upload", FileUploadRoutes.routes);
    router.use("/api/images", ImageRoutes.routes);

    return router;
  }
}
