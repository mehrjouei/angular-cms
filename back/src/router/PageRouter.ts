import { Router, Request, Response } from "express";
import Page from "../models/Page";
import Role from "../models/Roles";
import { ObjectID } from "bson";
import User from "../models/User";
import model from '../models/Website';

export class PageRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: any, res: Response): void {
    Page.find({ website: req.website, roles: { $elemMatch: { $in: req.user.roles } } }). // TODO predicate nadare!
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

  public menuList(req: any, res: Response): void { // TODO age admin e dg role check nakon
    Page.find({ website: req.website, isInMenu: true, roles: { $elemMatch: { $in: req.user.roles } } }, { _id: 1, title: 1, slug: 1, priority: 1 }). // TODO predicate nadare!
      then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  public one(req: any, res: Response): void {
    const slug = req.query["slug"];
    Page.findOne({
      website: req.website, slug, roles: { $elemMatch: { $in: req.user.roles } },
    }).
      populate('template').
      populate('author').
      populate({
        path: 'roles', model: Role
      }).
      populate('parts').
      populate('parts.module').
      populate('parts.container').
      populate({
        path: 'parts.roles', model: Role
      }).
      then((page: any) => {
        if (page) {
          page.parts = page.parts.filter((part: any) => part.roles && part.roles.length && part.roles.filter((r: any) => req.user.roles.filter((_r: any) => r.id == _r.id).length > 0).length);
          // page.parts = page.parts.map((part: any) => req.user.roles.filter((ur: any) => part.roles.filter((f:any)=>f.id==ur.id).length) ? part : null);
          res.status(200).json({ data: page }); // TODO
        }
        else {
          Page.findOne({
            website: req.website, slug
          })
            .then((page: any) => {
              if (page) {
                res.status(403).send("Access Denied.")
              } else {
                res.status(200).json({});
              }
            })
            .catch((e: any) => {
              res.status(500).json({ e });
            })
        }
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

    if (!title || !assets || !template) {
      res.status(409).json({ message: "All Fields Required." });
    }

    User.findOne({ _id: req.website.admin })
      .populate({
        path: 'Roles',
        model: Role
      })
      .then((u: any) => {
        const adminRole = u.Roles[0]; // admin only has one bloody role
        if (roles.indexOf(adminRole.id) === -1) {
          roles.push(adminRole.id);
        }
        const page: any = new Page({
          title,
          slug,
          assets,
          tags,
          isInMenu,
          roles,
          template: template,
          createDate: Date.now(),
          website: req.website,
        });
        if (req.user._id) {
          page.author = req.user;
          page.authorName = '';
        }
        else {
          page.authorName = req.user.username;
          page.author = null;
        }
        page.save()
          .then((data: any) => { res.status(200).json({ data }); })
          .catch((error: any) => { res.status(500).json({ error }); });
      })
      .catch((e: any) => {
        res.status(500).json({ e });
      });
  }

  public update(req: any, res: Response): void {
    const title: string = req.body.title;
    const slug: string = req.body.slug; // TODO
    const assets: string = req.body.assets;
    const tags: string = req.body.tags;
    const isInMenu: boolean = req.body.isInMenu;
    const template: string = req.body.template;
    const roles: string[] = req.body.roles;

    if (!title || !assets || !template) {
      res.status(409).json({ message: "All Fields Required." });
    }

    User.findOne({ _id: req.website.admin })
      .populate({
        path: 'Roles',
        model: Role
      })
      .then((u: any) => {
        const adminRole = u.Roles[0]; // admin only has one bloody role
        if (roles.indexOf(adminRole.id) === -1) {
          roles.push(adminRole.id);
        }
        const page: any = {
          title,
          slug,
          assets,
          tags,
          isInMenu,
          roles,
          template: template,
          editDate: Date.now(),
          website: req.website,
        };
        if (req.user._id) {
          page.author = req.user;
          page.authorName = '';
        }
        else {
          page.authorName = req.user.username;
          page.author = null;
        }
        Page.findOneAndUpdate({ slug }, page)
          .then(data => {
            res.status(200).json({ data });
          })
          .catch(error => {
            res.status(500).json({ error });
          });
      })
      .catch((e: any) => {
        res.status(500).json({ e });
      });
  }

  public addPart(req: any, res: Response): void { // TODO roles nadarim, be edit midim in karo
    const slug: string = req.body.slug;
    const part: { module: string, pane: string, data: any, title: string, container: string } = req.body;

    Role.find({ name: { $in: ['anonymous', 'administrator'] } }) // TODO
      .then((r: any) => {
        const defaultRoles = r; // admin only has one bloody role ??????!!!!!! // TODO
        Page.findOne({ website: req.website, slug }).then((p) => {
          if (p) {
            p.update({
              $push: {
                parts: {
                  module: ObjectID.createFromHexString(part.module),
                  pane: part.pane,
                  data: part.data,
                  title: part.title,
                  container: ObjectID.createFromHexString(part.container),
                  roles: defaultRoles
                }
              }
            })
              .then((data: any) => {
                res.status(204).end();
              })
              .catch(error => {
                res.status(500).json({ error });
              });
          }
          else {
            const newPage: any = {
              createDate: Date.now(),
              slug,
              website: req.website,
              roles: defaultRoles,
              parts: [
                {
                  module: ObjectID.createFromHexString(part.module),
                  pane: part.pane,
                  data: part.data,
                  title: part.title,
                  container: ObjectID.createFromHexString(part.container),
                  roles: defaultRoles
                }
              ]
            };
            if (req.user._id) {
              newPage.author = req.user;
              newPage.authorName = '';
            }
            else {
              newPage.authorName = req.user.username;
              newPage.author = null;
            }
            Page.insertMany([newPage])
              .then((data: any) => { res.status(200).json({ data }); })
              .catch((error: any) => { res.status(500).json({ error }); });
          }
        })
          .catch(error => {
            res.status(500).json({ error });
          });
      })
      .catch((e: any) => {
        res.status(500).json({ e });
      });
  }

  public editPart(req: any, res: Response): void {
    const slug = req.body.slug;
    const part: { _id: string, module: string, pane: string, data: any, title: string, container: any, roles: any[] } = req.body;
    if (!part.roles) {
      part.roles = [];
    }
    User.findOne({ _id: req.website.admin })
      .populate({
        path: 'Roles',
        model: Role
      })
      .then((u: any) => {
        const adminRole = u.Roles[0]; // admin only has one bloody role
        if (part.roles.indexOf(adminRole.id) === -1) {
          part.roles.push(adminRole._id);
        }
        const partId = ObjectID.createFromHexString(part._id);
        Page.update(
          {
            website: req.website,
            slug,
            // roles: { $elemMatch: { $in: req.user.roles } },
            // parts: { $elemMatch: { _id: partId, roles: { $elemMatch: { $in: req.user.roles } } } }
            'parts._id': partId,
            // 'parts.roles': { $elemMatch: { $in: req.user.roles } }
          },
          {
            $set: {
              'parts.$.data': part.data,
              'parts.$.title': part.title,
              'parts.$.container': part.container._id,
              'parts.$.roles': part.roles,

            }
          }
        )
          .then((data: any) => {
            res.status(200).end();
          })
          .catch(error => {
            res.status(500).json({ error });
          });
      })
      .catch((e: any) => {
        res.status(500).json({ e });
      });
  }

  public movePart(req: any, res: Response): void { // TODo not mi with edit for preventing over parameter attack, for now
    const slug: string = req.body.slug;
    const part: { _id: string, pane: string } = req.body;
    const partId = ObjectID.createFromHexString(part._id);
    Page.update(
      {
        website: req.website,
        slug,
        'parts._id': partId,
      },
      {
        $set: {
          'parts.$.pane': part.pane,
        }
      }
    )
      .then((data: any) => {
        if (data.nModified > 0) {
          res.status(200).end();
        }
        else {
          res.status(403).json({ message: 'Unauthorized user!' });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public deletePart(req: any, res: Response): void {
    const slug: string = req.body.slug; // page slug
    const part: string = req.body.part; // part id
    const partId = ObjectID.createFromHexString(part);
    Page.update(
      {
        website: req.website,
        slug
      },
      { $pull: { parts: { _id: partId } } }
    )
      .then((data: any) => {
        if (data.nModified > 0) {
          res.status(200).end();
        }
        else {
          res.status(403).json({ message: 'Unauthorized user!' });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public delete(req: any, res: Response): void {
    const slug: string = req.body.slug;

    Page.findOneAndRemove({ website: req.website, slug })
      .then(() => {
        res.status(204).end(); // TODO
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  routes() {
    this.router.get("/list/", this.all);
    this.router.get("/menu-list/", this.menuList);
    this.router.post("/", this.create);
    this.router.put("/", this.update);
    this.router.post("/delete", this.delete);
    this.router.put("/addPart", this.addPart);
    this.router.put("/editPart", this.editPart);
    this.router.post("/deletePart", this.deletePart);
    this.router.put("/movePart", this.movePart);
    this.router.get("/", this.one);
  }
}

const postRoutes = new PageRouter();
postRoutes.routes();

export default postRoutes.router;
