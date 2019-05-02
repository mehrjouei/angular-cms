import { Router, Request, Response } from "express";
import Article from "../models/Article";

export class BlogRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public one(req: any, res: Response): void {
    Article.find({ website: req.website }, { content: 0, comments: 0, createDate: 0, isDraft: 0 })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  routes() {
    this.router.get("/", this.one);
  }
}

const blogRouter = new BlogRouter();
blogRouter.routes();

export default blogRouter.router;
