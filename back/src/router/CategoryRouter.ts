import { Router, Request, Response } from "express";
import Category from "../models/Category";
import { ObjectID } from "bson";

export class CategoryRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the categorys in the database
  public all(req: any, res: Response): void {
    Category.find({ website: req.website }) // TODO predicate nadare
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  // get a single category by params of 'slug'
  public one(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Category.findOne({ _id, website: req.website })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // create a new category
  public create(req: any, res: Response): void {
    const name: string = req.body.name;
    const parent: string = req.body.parent;

    if (!name) {
      res.status(409).json({ message: "All Fields Required." });
    }

    let category;

    if (parent) {
      category = new Category({
        name,
        parent: ObjectID.createFromHexString(parent),
        website: req.website
      });
    }
    else {
      category = new Category({
        name,
        website: req.website
      });
    }

    category
      .save()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // update category by params of 'slug'
  public update(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Category.findOneAndUpdate({ _id, website: req.website }, req.body)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // delete category by params of 'slug'
  public delete(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Category.findOneAndRemove({ _id, website: req.website })
      .then(() => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  routes() {
    this.router.get("/list/", this.all);
    this.router.get("/:_id", this.one);
    this.router.post("/create/", this.create);
    this.router.put("/:_id", this.update);
    this.router.delete("/:_id", this.delete);
  }
}

const categoryRoutes = new CategoryRouter();
categoryRoutes.routes();

export default categoryRoutes.router;

 
