import { Router } from "express";
import { AuthController } from "../modules/auth/authController";
import { ImageDetectionRoutes } from "../modules/imageDetection/imageDetectionRoutes";


export class RestrictedRoutes {
    router: Router;
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes() {
        this.router.use("/image-detection", this.authController.validateJwt,  new ImageDetectionRoutes().router);
    }
}