import { Router, Request, Response } from "express";
import Page from "../models/Page";
import Role from "../models/Roles";
import Module from "../models/Module";
import Container from "../models/Container";
import { ObjectID } from "bson";

export class PageRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: any, res: Response): void {
    Page.find({ website: req.website }). // TODO predicate nadare!
      populate('template').
      populate('author').
      populate({
        path: 'roles', model: Role
      }).
      then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  public one(req: any, res: Response): void {
    const slug: string = req.params.slug;

    Page.findOne({ website: req.website, slug }).
      populate('template').
      populate('author').
      populate({
        path: 'roles', model: Role
      }).
      populate('parts').
      populate('parts.module').
      populate('parts.container').
      then((data: any) => {
        res.status(200).json({ data }); //TODO
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public create(req: any, res: Response): void {
    const title: string = req.body.title;
    const slug: string = req.body.slug;
    const assets: string = req.body.assets;
    const tags: string = req.body.tags;
    const isInMenu: boolean = req.body.isInMenu;
    const template: string = req.body.template;
    const roles: string[] = req.body.roles;
    // const parts: [{ module: string, pane: string, data: any, title: string, container: string }] = req.body.parts;

    if (!title || !assets || !template) {
      res.status(409).json({ message: "All Fields Required." });
    }

    const page = new Page({
      title,
      slug,
      assets,
      tags,
      isInMenu,
      roles: roles,
      template: template,
      author: req.user,
      createDate: Date.now(),
      website: req.website,
      // parts: parts.map(p => {
      //   return {
      //     module: ObjectID.createFromHexString(p.module),
      //     pane: p.pane,
      //     data: p.data,
      //     title: ObjectID.createFromHexString(p.module),
      //     container: ObjectID.createFromHexString(p.container),
      //   }
      // })
    });
    page.save()
      .then(data => { res.status(200).json({ data }); })
      .catch(error => { console.debug(error); res.status(500).json({ error }); });
  }

  public update(req: any, res: Response): void {
    const title: string = req.body.title;
    const slug: string = req.body.slug;
    const assets: string = req.body.assets;
    const tags: string = req.body.tags;
    const isInMenu: boolean = req.body.isInMenu;
    const template: string = req.body.template;
    const roles: string[] = req.body.roles;
    // const parts: [{ module: string, pane: string, data: any, title: string, container: string }] = req.body.parts;

    if (!title || !assets || !template) {
      res.status(409).json({ message: "All Fields Required." });
    }

    const page = {
      title,
      slug,
      assets,
      tags,
      isInMenu,
      roles: roles,
      template: template,
      author: req.user,
      editDate: Date.now(),
      website: req.website,
      // parts: parts.map(p => {
      //   return {
      //     module: ObjectID.createFromHexString(p.module),
      //     pane: p.pane,
      //     data: p.data,
      //     title: ObjectID.createFromHexString(p.module),
      //     container: ObjectID.createFromHexString(p.container),
      //   }
      // })
    };
    Page.findOneAndUpdate({ slug }, page)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public addPart(req: any, res: Response): void {
    const slug: string = req.params.slug;
    const part: { module: string, pane: string, data: any, title: string, container: string } = req.body;
    Page.findOne({ slug }).then((p) => {
      if (p) {
        p.update({
          $push: {
            parts: {
              module: ObjectID.createFromHexString(part.module),
              pane: part.pane,
              data: part.data,
              title: part.title,
              container: ObjectID.createFromHexString(part.container),
            }
          }
        })
          .then(() => {
            res.status(204).end();
          })
          .catch(error => {
            console.debug(error);
            res.status(500).json({ error });
          });
      }
      else {
        const newPage = new Page({
          author: req.user,
          createDate: Date.now(),
          slug,
          website: req.website,
          parts: [
            {
              module: ObjectID.createFromHexString(part.module),
              pane: part.pane,
              data: part.data,
              title: part.title,
              container: ObjectID.createFromHexString(part.container),
            }
          ]
        })
        newPage.save()
          .then(data => { res.status(200).json({ data }); })
          .catch(error => { console.debug(error); res.status(500).json({ error }); });
      }
    });
  }

  public editPart(req: any, res: Response): void {
    const slug: string = req.params.slug;
    const part: { _id: string, module: string, pane: string, data: any, title: string, container: string } = req.body;
    const partId = ObjectID.createFromHexString(part._id);
    Page.update(
      {
        'slug': slug,
        'parts._id': partId
      },
      {
        $set: {
          'parts.$.data': part.data,
        }
      }
    )
      .then(() => {
        res.status(200).end();
      })
      .catch(error => {
        console.debug(error);
        res.status(500).json({ error });
      });
  }

  public deletePart(req: any, res: Response): void {
    const slug: string = req.params.slug; // page slug
    const part: string = req.params.part; // part id
    console.debug(req.params);
    const partId = ObjectID.createFromHexString(part);
    Page.update(
      { slug },
      { $pull: { parts: { _id: partId } } }
    )
      .then(() => {
        res.status(200).end();
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const slug: string = req.params.slug;

    Page.findOneAndRemove({ slug })
      .then(() => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  routes() {
    this.router.get("/list/", this.all);
    this.router.get("/:slug", this.one);
    this.router.post("/create/", this.create);
    this.router.put("/:slug", this.update);
    this.router.delete("/:slug", this.delete);
    this.router.put("/addPart/:slug", this.addPart);
    this.router.put("/addPart/page/:slug", this.addPart);
    this.router.put("/editPart/:slug", this.editPart);
    this.router.put("/editPart/page/:slug", this.editPart);
    this.router.delete("/deletePart/:slug/:part", this.deletePart);
    this.router.delete("/deletePart/page/:slug/:part", this.deletePart);
  }
}

const postRoutes = new PageRouter();
postRoutes.routes();

export default postRoutes.router;
