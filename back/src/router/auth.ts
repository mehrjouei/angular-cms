import { Router, Request, Response } from 'express';
import User from '../models/User';
import * as app from '../server';
import * as jwt from 'jsonwebtoken';
import { ObjectID } from 'bson';

class AuthRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public authenticate(req: Request, res: Response): void {
        const username: string = req.body.username;
        User.findOne({ username })
            .then((user: any) => {
                if (!user) {
                    res.status(409).json({ success: true, message: 'Authentication failed. User not found.' });
                } else if (user) {
                    // check if password matches
                    if (user.password != req.body.password) {
                        res.status(409).json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {
                        // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password
                        const payload = {
                            username: user.username
                        };
                        var token = jwt.sign(payload, app.default.get('superSecret'), {
                            expiresIn: 1440 // expires in 24 hours
                        });
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token,
                            user: {
                                "firstName": user.firstName,
                                "lastName": user.lastName
                            }
                        });
                    }
                }
            })
            .catch((error) => {
                res.status(500).json({ error });
            })
    }

    // set up our routes
    routes() {
        this.router.post('/authenticate', this.authenticate);
    }

    loginRequired(req: any, res: any, next: any) {
        let resource = ""
        const _website = req.headers['website'] || 'NO_WEBSITE';
        if (req.user) {
            let username = req.user.username;
            let url = req.originalUrl;
            let method = req.method;

            User.findOne({ username })
                .populate({
                    path: 'Roles',
                    model: 'Roles',
                    populate: {
                        path: 'resources',
                        model: 'Resources'
                    }
                })
                // .populate('website')
                .then(function (user: any) {
                    const website = ObjectID.createFromHexString(_website);
                    if (user.username !== 'v.vulkan') { // TODO make it for super admin
                        if (user.username !== 'anonymous' && user.website !== website) {
                            return res.status(403).json({ message: 'Unauthorized user!' + website });
                        }
                        var flag = false;
                        for (let role of user.Roles) {
                            for (let res of role.resources) {
                                resource += res.name + " - ";
                                var reg = new RegExp(res.resourceContentReg);
                                if (reg.exec(url)) {
                                    if (res.method.toUpperCase() === method.toUpperCase()) {
                                        flag = true;
                                        // req.user = user;
                                        // next(); // TODO bloody complicated
                                    }
                                }
                            }
                        }
                        if (!flag) {
                            return res.status(403).json({ message: 'Unauthorized user!' + resource });
                        }
                        else {
                            req.website = website;
                            req.user = user;
                            next();
                        }
                    }
                    else { // TODO too complicated
                        req.website = website;
                        req.user = user;
                        next();
                    }
                })
        } else {
            console.debug("401");
            return res.status(401).json({ message: 'Unauthenticated user!' });
        }
    }
}

const authRoutes = new AuthRouter();
authRoutes.routes();


export default authRoutes;