import { Router, Request, Response } from 'express';
import User from '../models/User';

class UserRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: any, res: Response): void {
    User.find({website: req.website})
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })

  }

  public one(req: any, res: Response): void {
    const username: string = req.params.username;

    User.findOne({ website: req.website, username })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
  }

  public create(req: any, res: Response): void {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const username: string = req.body.username;
    const email: string = req.body.email
    const password: string = req.body.password;
    const admin: string = req.body.admin;
    const roles: string[] = req.body.roles;

    let user:any = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      admin,
      website: req.website
    });

    for (let role of roles) {
      user.Roles.push(role);
    }

    user.save()
      .then((data:any) => {
        res.status(201).json({ data }); // TODO why 201
      })
      .catch((error:any) => {
        res.status(500).json({ error });
      })

  }

  public update(req: any, res: Response): void {
    const username: string = req.params.username;

    User.findOneAndUpdate({ website: req.website, username }, req.body)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })

  }

  public delete(req: any, res: Response): void {
    const username: string = req.params.username;

    User.findOneAndRemove({ website: req.website, username })
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json({ error });
      })

  }

  // set up our routes
  routes() {
    this.router.get('/list', this.all);
    this.router.get('/:username', this.one);
    this.router.post('/create', this.create);
    this.router.put('/:username', this.update);
    this.router.delete('/:username', this.delete);
  }

}

const userRoutes = new UserRouter();
userRoutes.routes();


export default userRoutes.router;