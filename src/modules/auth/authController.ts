import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import NodeCache  from "node-cache"
import { JWT_SECRET } from "../../util/secrets";
import { Cache } from "../../util/cache";

export class AuthController {
    cache: NodeCache;
    JWT_EXPIRY_TIME = "30m";

    constructor() {
      this.cache = Cache.Instance.getCache();
    }

  public validateJwt = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']
        if(!token) return res.status(401).json('Unauthorize user')
        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded
            next()
        } catch(e) {
        res.status(400).json('invalid token')
      }
  }

  public successStatus = (req: Request, res: Response, next: NextFunction) => {
     return res.status(200).send()
  }

  public authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try{
      if(!req.body.username) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }

      let cacheResponse;
      if(!this.cache.has(req.body.username)) {
         cacheResponse = this.cache.set( req.body.username, [], Cache.Instance.getCacheTimeout() );
      } else {
        return res.status(409).send({ status: "error", message: "username already taken"  });
      }

      if(cacheResponse) {
        const token = jwt.sign({ username: req.body.username }, JWT_SECRET, {
          expiresIn: this.JWT_EXPIRY_TIME
        });
        res.status(200).send({ token: token });
      } else {
        res.status(500).send({ status: "error", message: "something went wrong"  });
      }
    } catch(err) {
      res.status(500).send({ status: "error", message: "something went wrong"  });
    }

  }
}