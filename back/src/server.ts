import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as config from './config';
import * as jwt from 'jsonwebtoken';

// import our routers/controllers
import ArticleRouter from './router/ArticleRouter';
import UserRouter from './router/UserRouter';
import AuthRouter from './router/auth';
import ResourcesRouter from './router/ResourcesRouter';
import RolesRouter from './router/RolesRouter';
import TemplateRouter from './router/TemplateRouter';
import PageRouter from './router/PageRouter';

import { NextFunction, Request } from 'express';
import CategoryRouter from './router/CategoryRouter';
import BlogRouter from './router/BlogRouter';
import ModuleRouter from './router/ModuleRouter';
import ContainerRouter from './router/ContainerRouter';

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
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

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

      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, this.app.get('superSecret'), (err: any, decoded: any) => {
          if (err) {
            req.user = {
              username: "anonymous"
            };
            // next();
            AuthRouter.loginRequired(req, res, next);
          } else {
            req.user = decoded;
            AuthRouter.loginRequired(req, res, next);
            // next();
          }
        });
      }
      else {
        req.user = {
          username: "anonymous"
        };
        AuthRouter.loginRequired(req, res, next);
        // req.next();
      }
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

  }
}

// export
export default new Server().app;
// export default Server;