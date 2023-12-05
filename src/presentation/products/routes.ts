import { Router } from "express";
import { envs } from "../../config";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services/product.service";
envs;

export class ProductRoutes {
  static get routes(): Router {
    const productService = new ProductService();
    const controller = new ProductController(productService);
    const router = Router();

    router.get("/", controller.getProducts);
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);

    return router;
  }
}
