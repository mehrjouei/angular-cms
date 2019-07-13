import { Router, Request, Response } from 'express';
import Roles from '../models/Roles';
import Website from "../models/Website";
import Resource from '../models/Resources';
class RolesRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: any, res: Response): void {

    Roles.find({ website: req.website })
      .populate({
        path: 'resources', model: Resource
      })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })

  }

  public one(req: any, res: Response): void {
    const _id = req.params._id;

    Roles.findOne({ _id, website: req.website })
      .populate('resources')
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public create(req: any, res: Response): void {
    const name: string = req.body.name;
    const description: string = req.body.description;
    const status: string = req.body.status;
    const resources = req.body.resources;

    const roles = new Roles({
      name,
      description,
      status,
      website: req.website,
      resources
    });

    roles.save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })

  }

  public update(req: any, res: Response): void {
    const _id = req.params._id;

    Roles.findOneAndUpdate({ _id, website: req.website }, req.body)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public delete(req: any, res: Response): void {
    const _id = req.params._id;

    Roles.findOneAndRemove({ _id, website: req.website })
      .then(() => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // set up our routes
  routes() {
    this.router.get('/list/', this.all);
    this.router.get('/:_id', this.one);
    this.router.post('/create/', this.create);
    this.router.put('/:_id', this.update);
    this.router.delete('/:_id', this.delete);
  }
}

const rolesRoutes = new RolesRouter();
rolesRoutes.routes();
export default rolesRoutes.router;
