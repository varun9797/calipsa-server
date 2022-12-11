import { Router } from "express";
import { AuthRoutes } from "../modules/auth/authRoutes";

export class PublicRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use("/", new AuthRoutes().router);
    }
}