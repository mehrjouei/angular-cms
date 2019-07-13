import { Router, Response } from "express";
import Module from "../models/Module";

export class ModuleRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: any, res: Response): void { // TODO make it aspect
    Module.find({ website: req.website }). // TODO predicate nadare!
      then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  public one(req: any, res: Response): void {
    const _id: string = req.params._id;

    Module.findOne({ website: req.website, _id }).
      then((data: any) => {
        res.status(200).json({ data }); //TODO
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // create o ina bara module ha dastie too db

  routes() {
    this.router.get("/list/", this.all);
    this.router.get("/:id", this.one);
  }
}

const moduleRoutes = new ModuleRouter();
moduleRoutes.routes();

export default moduleRoutes.router;
