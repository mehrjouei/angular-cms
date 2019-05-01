import { Router, Request, Response } from "express";
import Category from "../models/Category";

export class CategoryRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: any, res: Response): void { //  TODO
    Category.find({}, { _id: 0 })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  public update(req: Request, res: Response): void { //  TODO
    const categories = req.body;
    Category.collection.remove({}).then(_ => {
      Category.collection.insert(categories)
        .then(data => {
          res.status(200).json({ data });
        })
        .catch(error => {
          res.json({ error });
        });
    })
  }

  routes() {
    this.router.get("/list/", this.all);
    this.router.post("/update/", this.update);
  }
}

const categoryRoutes = new CategoryRouter();
categoryRoutes.routes();

export default categoryRoutes.router;
