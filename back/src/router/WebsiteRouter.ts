import { Router, Response } from "express";
import Website from "../models/Website";

export class WebsiteRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public one(req: any, res: Response): void { // TODO mtooye baghie ham hamin ino call koni behtare
        Website.findOne({ _id: req.website }).
            then((data: any) => {
                res.status(200).json({ data }); //TODO
            })
            .catch(error => {
                res.status(500).json({ error });
            });
    }

    public update(req: any, res: Response): void {
        Website.findOneAndUpdate({ _id: req.website }, req.body)
            .then(data => {
                res.status(200).json({ data });
            })
            .catch(error => {
                res.status(500).json({ error });
            });
    }

    public getRoleMappings(req: any, res: Response): void { //  TODO
        Website.findOne({ _id: req.website })
            .populate({
                path: 'Roles',
                model: 'Roles',
                populate: {
                    path: 'resources',
                    model: 'Resources'
                }
            })
            .then((website: any) => {
                let authType = website.settings.authentication.authType;
                if(authType == 'cms'){
                    authType = 'identity'; // TODO
                }
                const data = website.settings.authentication.roleMappings[authType];
                res.status(200).json({ data });
            })
            .catch(error => {
                res.json({ error });
            });
    }

    public updateRoleMappings(req: any, res: Response): void { //  TODO
        const maps = req.body;
        Website.findOne({ _id: req.website })
            .then((website: any) => {
                let authType = website.settings.authentication.authType;
                if(authType == 'cms'){
                    authType = 'identity'; // TODO
                }
                website.settings.authentication.roleMappings[authType].remove();
                website.settings.authentication.roleMappings[authType] = maps;
                website.settings.authentication.roleMappings[authType].save((data: any) => {
                    res.status(200).json({ data });
                })
            })
            .catch(error => {
                res.json({ error });
            });
    }

    routes() {
        this.router.get("/", this.one);
        this.router.put("/", this.update);
        this.router.get("/w/roleMappings", this.getRoleMappings);
        this.router.put("/w/roleMappings", this.updateRoleMappings);
    }
}

const websiteRoutes = new WebsiteRouter();
websiteRoutes.routes();

export default websiteRoutes.router;
