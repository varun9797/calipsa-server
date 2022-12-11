import { NextFunction, Request, Response } from "express";
import { Cache } from "../../util/cache";
import NodeCache  from "node-cache"

export class ImageDetectionController {
  cache: NodeCache;

  constructor() {
    this.cache = Cache.Instance.getCache();
  }

  // TODO - need to add  JOI validation
  public upload = (req: Request, res: Response, next: NextFunction) => {
    let data: any = this.cache.get( req.user.username)  || [];
    this.cache.set( req.user.username, [...data, req.body], Cache.Instance.getCacheTimeout() );
    return res.status(200).send({message: "sucessfull"});
  }

  public getDetails = (req: Request, res: Response, next: NextFunction) => {
      const data = this.cache.get( req.user.username);
      return res.status(200).send(data);
  }

}