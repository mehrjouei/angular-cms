import { Router, Request, Response } from "express";
import Template from "../models/Template";
import { ObjectID } from "bson";

export class TemplateRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the templates in the database
  public all(req: any, res: Response): void {
    Template.find({ website: req.website }) // TODO predicate nadare
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  // get a single template by params of 'slug'
  public one(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Template.findOne({ _id, website: req.website })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // create a new template
  public create(req: any, res: Response): void {
    const name: string = req.body.name;
    const html: string = req.body.html;
    const image: string = req.body.image;
    const assets: string = req.body.assets;

    if (!name || !html) {
      res.status(409).json({ message: "All Fields Required." });
    }

    const template = new Template({
      name,
      html,
      image,
      assets,
      website: req.website
    });

    template
      .save()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // update template by params of 'slug'
  public update(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Template.findOneAndUpdate({ _id, website: req.website }, req.body)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // delete template by params of 'slug'
  public delete(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Template.findOneAndRemove({ _id, website: req.website })
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

const templateRoutes = new TemplateRouter();
templateRoutes.routes();

export default templateRoutes.router;
