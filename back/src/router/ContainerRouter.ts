import { Router, Request, Response } from "express";
import Container from "../models/Container";
import { ObjectID } from 'bson';

export class ContainerRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the containers in the database
  public all(req: any, res: Response): void {
    Container.find({}) // TODO predicate nadare
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  // get a single container by params of 'id'
  public one(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Container.findOne({ _id })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // create a new container
  public create(req: any, res: Response): void {
    const name: string = req.body.name;
    const html: string = req.body.html;
    const image: string = req.body.image;
    if (!name || !html) {
      res.status(409).json({ message: "All Fields Required." });
    }

    const container = new Container({
      name,
      html,
      image
    });

    container
      .save()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // update container by params of 'slug'
  public update(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Container.findOneAndUpdate({ _id }, req.body)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // delete container by params of 'slug'
  public delete(req: any, res: Response): void {
    const _id = ObjectID.createFromHexString(req.params._id);

    Container.findOneAndRemove({ _id })
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

const containerRoutes = new ContainerRouter();
containerRoutes.routes();

export default containerRoutes.router;
