import { Router, Request, Response } from 'express';
import Roles from '../models/Roles';
import * as app from '../server';
class RolesRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {

    Roles.find()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })

  }

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const description: string = req.body.description;
    const status: string = req.body.status;

    const roles = new Roles({
      name,
      description,
      status
    });
    
    roles.save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })

  }

  // set up our routes
  routes() {
    this.router.get('/list/', this.all);
    // this.router.get('/:id',this.one);
    this.router.post('/create/', this.create);
    // this.router.put('/:id',this.update);
    // this.router.delete('/:id',this.delete);
  }
}

const rolesRoutes = new RolesRouter();
rolesRoutes.routes();
export default rolesRoutes.router;
