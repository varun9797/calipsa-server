import { Router } from "express";
import { AuthController } from "./authController";

export class AuthRoutes {

    router: Router;
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/login", this.authController.authenticateUser);
        this.router.get("/verify-token", this.authController.validateJwt, this.authController.successStatus);
    }
}