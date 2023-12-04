import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorizarion = req.header("Authorization");

    if (!authorizarion)
      return res.status(401).json({ error: "Not token provider" });
    if (!authorizarion.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalidad Bearer Token" });
    const token = authorizarion.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid Token" });
      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(400).json({ error: "Invalid token - user" });
      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
