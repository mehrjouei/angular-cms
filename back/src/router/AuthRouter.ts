import to from 'await-to-js';
import { ObjectID } from 'bson';
import { Response, Router } from 'express';
import { Guid } from 'guid-typescript';
import * as http from 'http';
import * as https from 'https';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { Subject } from 'rxjs';
import Resources from '../models/Resources';
import Roles from '../models/Roles';
import User from '../models/User';
import * as app from '../server';
import { get, post } from '../utilities/httpUtility';
import { jsonify } from '../utilities/jsonUtility';
import { mail } from '../utilities/notificationUtility';
import * as bcrypt from 'bcrypt'

const saltRounds = 10;

class AuthRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async signUp(req: any, res: Response): Promise<void> {
    const username: string = req.body.username;
    const password: string = req.body.password; //  TODO make pas hash
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const email: string = req.body.email;
    const authType = req.website.settings.authentication.authType;
    const website = req.website;
    const recaptcha: string = req.body.recaptcha;
    const [e_, r_] = await to(post(null,
      'www.google.com',
      '/recaptcha/api/siteverify?secret=6LdLLagUAAAAALZsI1NBwjyMFfh3EWJutS895-gW&response=' + recaptcha,
      {
        'Content-Type': 'application/json'
      }, 443, true
    ));
    if (e_) {
      res.status(500).json({error:e_.message});
      return;
    }
    const googleVerifyResponse = JSON.parse(r_);
    if (!googleVerifyResponse.success) {
      res.status(403).json({message:'You Sneaky Bot.'});
      return;
    }
    switch (authType) {
      case 'cms':
        const [e, u] = await to(User.findOne({ username }).exec());
        if (e) {
          res.status(500).json({ e });
        }
        if (u) {
          res.status(409).json({ success: false, message: 'User already exists.' });
        }
        const verifyId = Guid.create().toString();
        const [er, re] = await to(Roles.findOne({ name: 'anonymous' }).exec());
        if (er) {
          res.status(500).json({ er });
          return;
        }
        if (!re) {
          res.status(500).json({message:"FATAL"}); // TODO FATAL
          return;
        }
        const [hError, hash] = await to(bcrypt.hash(password, saltRounds));
        if (hError) {
          res.status(500).json({error:hError});
          return;
        }
        const user = {
          username,
          password: hash,
          website,
          admin: false,
          createDate: Date.now(),
          email,
          firstName,
          lastName,
          isActive: false,
          verifyId,
          Roles: [re._id] // TODO don't bloody forget this
        };
        const [_e, _u] = await to(User.insertMany([user]));
        if (_e) {
          res.status(500).json({ error: _e });
          return;
        }
        const verifyLink = website.url + 'auth/verify/' + verifyId;
        const [__e, r] = await (to(mail({
          host: website.settings.authentication.email[authType].host,
          port: website.settings.authentication.email[authType].port,
          secure: false,
          auth: {
            user: website.settings.authentication.email[authType].user,
            pass: website.settings.authentication.email[authType].pass
          },
          tls: { rejectUnauthorized: false },
          destination: email,
          subject: "Please confirm your Email account",
          content: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + verifyLink + ">Click here to verify</a>"
        })));
        if (__e) {
          res.status(500).json({ error: __e.message });
          return;
        }
        res.json(r);
        break;
      case 'identity':
        const [___e, ___r] = await to(post({
          username: req.body.username,
          password: req.body.password,
          mobileNumber: "",
          passowrd: ""
        },
          req.website.settings.authentication.authUrl['identity'].base,
          req.website.settings.authentication.authUrl['identity'].signUp,
          {
            'Content-Type': 'application/json'
          },
          req.website.settings.authentication.authUrl['identity'].port,
          req.website.settings.authentication.authUrl['identity'].isSecured));
        if (___e) {
          res.status(500); // TODO make unified format for errors
        }
        res.json({
          success: true,
          message: 'Enjoy signUp!',
          user: {
            success: true,
            message: ___r // TODO
          }
        });
        break;
      default:
        res.status(409).json({message:'unsupported authentication type'});
    }
  }

  public verify(req: any, res: Response): void {
    const verifyId: string = req.body.verifyId;
    const authType = req.website.settings.authentication.authType;
    switch (authType) {
      case 'cms':
        User.findOneAndUpdate({ verifyId }, { isActive: true, verifyId: '' })
          .then((u: any) => {
            res.json({
              success: true,
              message: 'Account has been activated'
            });
          })
          .catch((e: any) => {
            res.status(500).json({ e }); // TODO 409
          });
        break;
      case 'identity':
        res.status(500).json({ message: 'not implemented!' });
        break;
      default:
        res.status(409).write('unsupported authentication type');
    }
  }

  public async login(req: any, res: Response): Promise<void> { // TODO this is pure login, there ain't any bloody signUp here
    const username: string = req.body.username;
    const password: string = req.body.password;
    const rememberMe: boolean = req.body.rememberMe;
    const authType = req.website.settings.authentication.authType; // TODO bloody dirty
    const recaptcha: string = req.body.recaptcha;
    const [e_, r_] = await to(post(null,
      'www.google.com',
      '/recaptcha/api/siteverify?secret=6LdLLagUAAAAALZsI1NBwjyMFfh3EWJutS895-gW&response=' + recaptcha,
      {
        'Content-Type': 'application/json'
      }, 443, true
    ));
    if (e_) {
      res.status(500).json({message:e_.message});
      return;
    }
    const googleVerifyResponse = JSON.parse(r_);
    if (!googleVerifyResponse.success) {
      res.status(409).json({message:'You Sneaky Bot.'});
      return;
    }
    let token: any = null;
    switch (authType) {
      case 'cms':
        User.findOne({ username })
          .populate({
            path: 'Roles',
            model: 'Roles',
          })
          .then(async (user: any) => {
            if (!user) {
              res.status(409).json({ success: true, message: 'Authentication failed. Wrong User OR password.' });
            } else if (user) {
              if (!user.isActive) {
                res.status(409).json({ success: true, message: 'Authentication failed. Account not activated.' });
              }
              else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                  username: user.username
                };
                token = jwt.sign(payload, app.default.get('superSecret'), {
                  expiresIn: rememberMe ? 1440 * 7 * 2 : 1440 // expires in 24 hours
                });
                // check if password matches
                const [hError, hash] = await to(bcrypt.hash(password, saltRounds));
                if (hError) {
                  res.status(500).write(hError);
                  return;
                }
                if (user.password != hash) {
                  res.status(409).json({ success: false, message: 'Authentication failed. Wrong User OR password.' });
                } else {
                  // return the information including token as JSON
                  res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user: {
                      "firstName": user.firstName,
                      "lastName": user.lastName,
                      "roles": user.Roles.map((x: any) => x.name)
                    }
                  });
                }
              }
            }
          })
          .catch((error) => {
            res.status(500).json({ error })
          })
        break;
      case 'identity':
        const [e, r] = await to(post({
          grant_type: 'password',
          username,
          password,
          scope: 'openid thirdpersoninsuranceadminapi cdn profile orders payments locations profiles reviews identities reminders messages roles',
          client_id: 'IAWapp',
          client_secret: 'secret'
        },
          req.website.settings.authentication.authUrl['identity'].base,
          req.website.settings.authentication.authUrl['identity'].token,
          {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, req.website.settings.authentication.authUrl['identity'].port, req.website.settings.authentication.authUrl['identity'].isSecured));
        if (e) {
          res.status(500).json({message:e.message});
          return;
        }
        const json = JSON.parse(r);
        token = json.access_token;
        if (token) {
          const [_e, _r] = await to(get({},
            req.website.settings.authentication.authUrl['identity'].base,
            req.website.settings.authentication.authUrl['identity'].userInfo,
            {
              'Authorization': 'Bearer ' + token
            },
            req.website.settings.authentication.authUrl['identity'].port,
            req.website.settings.authentication.authUrl['identity'].isSecured
          ));
          if (_e) {
            res.status(409).json({ error: _e });
            return;
          }
          const json = JSON.parse(_r);
          const identityRoles = Array.isArray(json.role) ? json.role : [json.role];
          const roleMaping = req.website.settings.authentication.roleMappings['identity'];
          const mapedRolesId = identityRoles.map((x: any) => (roleMaping.find((y: any) => y.name == x)) ? (roleMaping.find((y: any) => y.name == x)).pair : null);
          const [__e, roles] = await to(Roles.find({ _id: { '$in': mapedRolesId } }).exec());
          if (__e) {
            res.status(500).json({ error: __e });
          }
          if (!roles) {
            res.status(500).json({ error: 'Internal Server Error.' });
          } else {
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: 'Bearer ' + token,
              user: {
                "firstName": json.given_name,
                "lastName": json.family_name,
                "roles": roles.map((x: any) => x.name)
              }
            });
          }
        }
        else {
          res.status(409).json({message:'userPassError'});
        }
        break;
      default:
        res.status(409).json({message:'unsupported authentication type'});
    }
  }

  public forgotPassword(req: any, res: Response): void {
    const username: string = req.body.username;
    const authType = req.website.settings.authentication.authType;
    const website = req.website;
    switch (authType) {
      case 'cms':
        User.findOne({ username, website })
          .then((u: any) => {
            if (u) {
              const verifyId = Guid.create().toString(); // TODO we use verifyId for forgot password too, find better name 
              u.verifyId = verifyId;
              u.save().then(() => {
                const smtpTransport = nodemailer.createTransport({
                  host: website.settings.authentication.email[authType].host,
                  port: website.settings.authentication.email[authType].port,
                  secure: false,
                  auth: {
                    user: website.settings.authentication.email[authType].user,
                    pass: website.settings.authentication.email[authType].pass
                  },
                  tls: { rejectUnauthorized: false }
                });
                const changeLink = website.url + 'auth/change-password/' + verifyId;
                const mailOptions = {
                  from: website.settings.authentication.email[authType].user,
                  to: u.email,
                  subject: "Change Password",
                  html: "Hello,<br> Please Click on the link to change  your password.<br><a href=" + changeLink + ">Click here to change password</a>"
                };
                smtpTransport.sendMail(mailOptions, (e, response) => {
                  if (e) {
                    res.status(500).json({ e });
                  } else {
                    res.json({
                      success: true,
                      message: 'change password using link we have sent to your email.'
                    });
                  }
                });
              });
            }
            else {
              res.status(409).json({message:'User doesn\'t exist'});
            }
          })
          .catch((e: any) => {
            res.status(500).json({ e });
          });
        break;
      case 'identity':
        res.status(500).json({ message: 'not implemented!' });
        break;
      default:
        res.status(409).json({message:'unsupported authentication type'});
    }
  }

  public async changePassword(req: any, res: Response): Promise<void> {
    const verifyId: string = req.body.verifyId;
    const password: string = req.body.password;
    const authType = req.website.settings.authentication.authType;
    switch (authType) {
      case 'cms':
        const [hError, hash] = await to(bcrypt.hash(password, saltRounds));
        if (hError) {
          res.status(500).json({message:hError});
          return;
        }
        User.findOneAndUpdate({ verifyId }, { verifyId: '', password: hash, editDate: Date.now() })
          .then((u: any) => {
            res.json({
              success: true,
              message: 'Password has been changed.'
            });
          })
          .catch((e: any) => {
            res.status(500).json({ e }); // TODO 409
          });
        break;
      case 'identity':
        res.status(500).json({ message: 'not implemented!' });
        break;
      default:
        res.status(409).json({message:'unsupported authentication type'});
    }
  }

  checkRoles(req: any, res: any, next: any, validToken: any) {
    let resource = ""
    let user = req.user;
    let url = req.originalUrl;
    let method = req.method;
    var flag = false;
    for (let role of user.roles) {
      for (let _res of role.resources) {
        resource += _res.name + " - ";
        var reg = new RegExp(_res.resourceContentReg);
        if (reg.exec(url)) {
          if (_res.method.toUpperCase() === method.toUpperCase()) {
            flag = true;
            return next(); // TODO bloody complicated, got complexity by using return, and remove break points
            // break;
          }
        }
      }
      if (flag) {
        break;
      }
    }
    if (!flag) {
      let findResourceFlag = false;
      Resources.find()
        .then((resourcesList: any) => {
          let reg;
          try {
            for (let r of resourcesList) {
              reg = new RegExp(r.resourceContentReg);
              if (reg.exec(url)) {
                if (r.method.toUpperCase() === method.toUpperCase()) {
                  findResourceFlag = true;
                  break;
                }
              }
            }
          } catch (error) {
            console.log(error);
            return res.sendStatus(500);
          }

          if (!findResourceFlag) {
            return res.status(404).json({ message: 'service not found!' });
          }
          if (findResourceFlag && !validToken) {
            return res.status(401).json({ message: 'Unauthenticated user!' });
          }
          return res.status(403).json({ message: 'Unauthorized user!' });

        });
    }

  }

  getUserFromToken(token: string, website: any, app: any, res: any): Subject<any> {
    let returnSubject: Subject<any> = new Subject()
    let user: any = {};

    let authType = website.settings.authentication.authType;
    //-------------- if token is empty so user is anonymous --------------
    if (!token) {
      authType = "cms";
    }
    switch (authType) {
      case 'cms':
        jwt.verify(token, app.get('superSecret'), (err: any, decoded: any) => {
          if (err) {
            user = {
              username: "anonymous",
              validToken: false
            };
          } else {
            user = decoded;
            user.validToken = true
          }
        });
        User.findOne({ website: website._id, username: user.username })
          .populate({
            path: 'Roles',
            model: 'Roles',
            populate: {
              path: 'resources',
              model: 'Resources'
            }
          })
          .then(function (u: any) {
            user.roles = u.Roles;
            user._id = u._id;
            returnSubject.next(user);
          })
          .catch((e: any) => {
          });
        break;

      case 'identity':
        var options = { host: website.settings.authentication.authUrl['identity'].base, port: website.settings.authentication.authUrl['identity'].port, path: website.settings.authentication.authUrl['identity'].userInfo, method: 'GET', headers: { 'Authorization': `${token}`, 'Content-Type': 'application/json' } };
        let applicationProtocol: any = null; // TODO clean this mess up
        if (!website.settings.authentication.authUrl['identity'].isSecured) {
            applicationProtocol = http;
        } else {
            applicationProtocol = https;
        }
        var request = applicationProtocol.request(options, (_res: any) => {
          _res.setEncoding('utf8');
          _res.on('data', (_res: any) => {
            const json = JSON.parse(_res);
            let rolesArray: any[] = [];
            (Array.isArray(json.role)) ? rolesArray = json.role : rolesArray = [json.role];

            const ourRoles = website.settings.authentication.roleMappings[website.settings.authentication.authType]
              .filter((rm: any) => {
                if (rolesArray.filter((t: any) => t === rm.name).length > 0) {
                  return true;
                }
                else {
                  return false;
                }
              })
              .map((rm: any) => {
                return rm.pair
              });
            Roles
              .find({ website: website._id, _id: { '$in': ourRoles } })
              .populate({
                path: 'resources',
                model: 'Resources'
              })
              .then((roles: any[]) => {
                user = {
                  username: json.unique_name,
                  roles: roles,
                  validToken: true
                };
                returnSubject.next(user);
              });
          });
          _res.on('end', (x: any) => {
            if (_res.statusCode == 401) {
              user = {
                username: "anonymous",
                validToken: false
              };
              User.findOne({ website: website._id, username: user.username })
                .populate({
                  path: 'Roles',
                  model: 'Roles',
                  populate: {
                    path: 'resources',
                    model: 'Resources'
                  }
                })
                .then(function (u: any) {
                  user.roles = u.Roles;
                  returnSubject.next(user);
                })
            }
          });
        });
        request.end();
        break;
      default:
        res.status(409).write('unsupported authentication type');
    }

    return returnSubject;
  }

  // set up our routes
  routes() {
    this.router.post('/login', this.login);
    this.router.post('/sign-up', this.signUp);
    this.router.put('/verify', this.verify);
    this.router.put('/forgot-password', this.forgotPassword);
    this.router.put('/change-password', this.changePassword);
  }
}

const authRoutes = new AuthRouter();
authRoutes.routes();


export default authRoutes;