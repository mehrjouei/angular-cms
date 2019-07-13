import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as config from './config';

// import our routers/controllers
import ArticleRouter from './router/ArticleRouter';
import UserRouter from './router/UserRouter';
import AuthRouter from './router/AuthRouter';
import ResourcesRouter from './router/ResourcesRouter';
import RolesRouter from './router/RolesRouter';
import TemplateRouter from './router/TemplateRouter';
import PageRouter from './router/PageRouter';

import { NextFunction, Request } from 'express';
import CategoryRouter from './router/CategoryRouter';
import BlogRouter from './router/BlogRouter';
import ModuleRouter from './router/ModuleRouter';
import ContainerRouter from './router/ContainerRouter';
import WebsiteRouter from './router/WebsiteRouter';
import Website from './models/Website';
import FileRouter from './router/FileRouter';

var path = require('path');

class Server {
  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  public config(): void {

    // const MONGO_URI: string = 'mongodb://localhost:27017/mgw'; 
    mongoose.connect(config.variables.database);
    this.app.set('superSecret', config.variables.secret);
    // express middleware
    this.app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    this.app.use(bodyParser.json({limit: '5mb'}));
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    var dir = path.join(__dirname, 'public');
    this.app.use(express.static(dir));

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();
    router.use((req: any, res: any, next: NextFunction) => {
      var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
      Website.findOne({ name: req.headers['website'] })
        .then((webSite: any) => {
          AuthRouter.getUserFromToken(token, webSite, this.app, res) // TODO this subjects seem like bloody gotos!
            .subscribe((user: any) => {
              req.user = user;
              req.website = webSite;
              AuthRouter.checkRoles(req, res, next, user.validToken);
            })
        })
        .catch((e: any) => {
          res.status(409).send("NO_WEBSITE");
        });
    });
    this.app.use('/', router);
    this.app.use('/api/articles', ArticleRouter);
    this.app.use('/api/users', UserRouter);
    this.app.use('/api/auth', AuthRouter.router);// TODO
    this.app.use('/api/resources', ResourcesRouter);
    this.app.use('/api/roles', RolesRouter);
    this.app.use('/api/templates', TemplateRouter);
    this.app.use('/api/pages', PageRouter);
    this.app.use('/api/categories', CategoryRouter);
    this.app.use('/api/blog', BlogRouter);
    this.app.use('/api/modules', ModuleRouter);
    this.app.use('/api/containers', ContainerRouter);
    this.app.use('/api/website', WebsiteRouter);
    this.app.use('/api/file', FileRouter);
    this.app.use(function (req, res) {
      res.status(404);
      // .render('404.html');
    });

  }


}

// export
export default new Server().app;
// export default Server;