import { Router, Request, Response } from "express";
import Article from "../models/Article";
import Category from "../models/Category";
import { ObjectID } from "bson";
import { Guid } from 'guid-typescript';
import { Promise } from "bluebird";
import * as fs from 'fs';

export class ArticleRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the articles in the database
  public all(req: any, res: Response): void {
    Article.find({ website: req.website }) // TODO predicate nadare
      .populate({
        path: 'categories',
        model: Category
      })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  public allByCategory(req: any, res: Response): void {
    const category = req.query.category;
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    const predicate: any = {};
    if (category) {
      predicate.name = category;
    }
    Category.find(predicate).then((c: any[]) => {
      Promise.all([Article.find({ website: req.website, categories: { '$in': c } })// TODO
        .skip(offset).limit(limit)
        .populate({
          path: 'categories',
          model: Category
        }).exec(),
      Article.count({ website: req.website, categories: { '$in': c } }).exec()
      ])
        .then((resolves: any[]) => {
          res.status(200).json({ data: resolves[0], totalCount: resolves[1] });
        })
        .catch((error: any) => {
          res.json({ error });
        });
    });
  }

  // get a single article by params of 'slug'
  public one(req: any, res: Response): void {
    const slug: string = req.params.slug;

    Article.findOne({ website: req.website, slug })
      .populate({
        path: 'categories',
        model: Category
      })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // create a new article
  public create(req: any, res: Response): void {
    const title: string = req.body.title;
    const slug: string = req.body.slug;
    const summary: string = req.body.summary;
    const content: string = req.body.content;
    const categories: string[] = [...req.body.categories];
    const createDate: Date = req.body.createDate;
    const image = req.body.image;
    let imageName = req.body.imageName;
    const tags: string = req.body.tags;
    const isDraft: boolean = req.body.isDraft;

    imageName = Guid.create() + imageName;

    if (!title || !content || !summary || !slug) {
      res.status(409).json({ message: "All Fields Required." });
    }
    const article: any = {
      title,
      slug,
      summary,
      content,
      categories: categories.map(c => ObjectID.createFromHexString(c)),
      createDate,
      image: imageName,
      tags,
      isDraft,
      website: req.website
    };
    if (req.user._id) {
      article.author = req.user;
      article.authorName = '';
    }
    else {
      article.authorName = req.user.username;
      article.author = null;
    }
    Article
      .insertMany([article])
      .then((data: any) => {
        var base64Data = image.replace(/^data:image\/(png|jpg|jpeg)+;base64,/, "");
        fs.writeFile('src/public/images/' + imageName, base64Data, { encoding: 'base64' }, (err: any) => { // TODO image paths, add id to image name
          if (err) {
            res.status(500).json({ err }); // TODO
          }
          else {
            res.status(200).json({ success: true });
          }
        });
      })
      .catch((error: any) => {
        res.status(500).json({ error });
      });

  }

  // update article by params of 'slug'
  public update(req: any, res: Response): void {
    const slug: string = req.body.slug;
    const categories: string[] = req.body.categories;

    let imageName = Guid.create() + req.body.imageName;

    const article: any = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      categories: categories.map(c => ObjectID.createFromHexString(c)),
      editDate: Date.now(),
      image: imageName,
      imageName,
      tags: req.body.tags
    };
    if (req.user._id) {
      article.author = req.user;
      article.authorName = '';
    }
    else {
      article.authorName = req.user.username;
      article.author = null;
    }

    Article.findOneAndUpdate({ website: req.website, slug }, article)
      .then(data => {
        var base64Data = req.body.image.replace(/^data:image\/(png|jpg|jpeg)+;base64,/, ""); // TODO delete previous image
        fs.writeFile('src/public/images/' + imageName, base64Data, { encoding: 'base64' }, (err: any) => { // TODO image paths, add id to image name
          if (err) {
            res.status(500).json({ err }); // TODO
          }
          else {
            res.status(200).json({ success: true });
          }
        });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // delete article by params of 'slug'
  public delete(req: any, res: Response): void {
    const slug: string = req.params.slug;

    Article.findOneAndRemove({ website: req.website, slug })
      .then(() => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public addComment(req: any, res: Response): void {
    const articleSlug: string = req.params.articleSlug;
    const parent: string = req.body.parent;
    const text: string = req.body.text;
    const slug = Guid.create();// TODO

    if (!articleSlug || !text) {
      res.status(409).json({ message: "All Fields Required." });
    }

    Article.findOne({ website: req.website, slug: articleSlug }) // TODO parent validation
      .then((article: any) => {
        const comment = {
          parent: parent ? ObjectID.createFromHexString(parent) : undefined,
          author: req.user,
          text,
          slug
        };
        article.comments.unshift(comment);
        article
          .save()
          .then((data: any) => {
            res.status(200).json({ data });
          })
          .catch((error: any) => {
            res.status(500).json({ error });
          });
      });
  }

  public updateComment(req: any, res: Response): void { // TODO validation if belongs to this article
    const _id: string = req.params._id;
    Article.findOneAndUpdate({ website: req.website, comments: { $elemMatch: { _id } } }, req.body)
      .then((data: any) => {
        res.status(200).json({ data });
      })
      .catch((error: any) => {
        res.status(500).json({ error });
      });
  }

  public deleteComment(req: any, res: Response): void {
    const _id: string = req.params._id;
    Article.findOneAndRemove({ website: req.website, comments: { $elemMatch: { _id } } })
      .then(() => {
        res.status(204).end();
      })
      .catch((error: any) => {
        res.status(500).json({ error });
      });
  }

  routes() {
    this.router.get("/list/", this.all);
    this.router.get("/list-by-category/", this.allByCategory);
    this.router.get("/:slug", this.one);
    this.router.post("/create/", this.create);
    this.router.put("/:slug", this.update);
    this.router.delete("/:slug", this.delete);
    this.router.post("/addComment/:articleSlug", this.addComment);
    this.router.put("/updateComment/:id", this.updateComment);
    this.router.delete("/deleteComment/:id", this.deleteComment);
  }
}

const articleRoutes = new ArticleRouter();
articleRoutes.routes();

export default articleRoutes.router;
