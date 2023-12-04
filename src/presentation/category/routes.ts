import { Router } from "express";
import { envs } from "../../config";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";
envs;

export class CategoryRoutes {
  static get routes(): Router {
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);
    const router = Router();

    router.get("/", controller.getCategories);
    router.post("/", [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}
