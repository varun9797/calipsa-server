import { Router } from "express";
import { ImageDetectionController } from "./imageDetectionController";

export class ImageDetectionRoutes {

    router: Router;
    public imageDetectionController: ImageDetectionController = new ImageDetectionController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/upload", this.imageDetectionController.upload);
        this.router.get("/info", this.imageDetectionController.getDetails);
    }
}