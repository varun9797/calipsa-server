import express from "express";
import compression from "compression";
import cors from "cors";
import { PublicRoutes } from "./routes/public";
import { RestrictedRoutes } from "./routes/restricted";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public routes(): void {
    this.app.use("/api", new PublicRoutes().router);
    this.app.use("/api/auth", new RestrictedRoutes().router);
  }

  public config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        "  API is running at http://localhost:%d",
        this.app.get("port")
      );
    });
  }

}

const server = new Server();

server.start();
