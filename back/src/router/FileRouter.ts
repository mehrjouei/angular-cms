import { Router, Response } from 'express';
import File from '../models/File';
import { File as FileViewModel } from '../viewModels/file';
import Copy from '../viewModels/copy';
import * as fileUtility from '../utilities/fileUtility'; // TODO use __basedir
import to from 'await-to-js';
import { Guid } from 'guid-typescript';
import * as path from 'path';


export class FileRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getFile(req: any, res: Response): Promise<void> {
        const [e, r] = await to(File.count({ wesbite: req.website, path: decodeURIComponent(req.query['path']) }).exec());
        if (e || r === undefined) {
            res.sendStatus(500);
            return;
        }
        if (r) {
            const [_e, _r] = await to(File.count({ // TODO
                wesbite: req.website,
                path: decodeURIComponent(req.query['path']),
                permissions: { $or: [{ user: req.user }] }
            }).exec()); // TODO check role
            if (_e || _r === undefined) {
                res.sendStatus(500);
                return;
            }
            if (!_r) {
                res.status(409).json({ error: 'access denied.' });
            }
        }
        const path: string = fileUtility.getWebsiteCdnFolder(req.query['path'], 'file', req.website.name);
        const [__e, __r] = await to(fileUtility.isDirectory(path));
        if (__e || __r === undefined) { // TODO waht  is this bloody undefined????
            res.sendStatus(500);
            return;
        }
        if (__r) {
            res.status(400).json({ error: 'not a valid file' });
            return;
        } else {
            const [___e, ___r] = await to(fileUtility.getFile(path));
            if (___e) {
                res.sendStatus(500);
                return;
            }
            res.send(___r);
            return;
        }
    }

    public async getDirectory(req: any, res: Response): Promise<void> {
        const path: string = fileUtility.getWebsiteCdnFolder(req.query['path'], 'directory', req.website.name);
        const [e, r] = await to(fileUtility.isDirectory(path));
        if (e || r === undefined) {
            res.sendStatus(500);
            return;
        }
        if (r) {
            const [_e, _r] = await to(fileUtility.getDirectory(path));
            if (_e) {
                res.sendStatus(500);
                return;
            }
            res.send(_r);
            return;
        } else {
            res.status(400).json({ error: 'not a valid directory' });
            return;
        }
    }

    public async download(req: any, res: Response): Promise<void> {
        const path: string = fileUtility.getWebsiteCdnFolder(req.query['path'], 'file', req.website.name);
        const [e, r] = await (to(fileUtility.exists(path)));
        if (e || r === undefined) {
            res.sendStatus(500);
            return;
        }
        if (!r) {
            res.status(409).json({ error: 'file doesn\'t exist.' });
            return;
        }
        const [_e, _r] = await to(fileUtility.isDirectory(path));
        if (_e || _r === undefined) {
            res.sendStatus(500);
            return;
        }
        if (_r) {
            res.status(409).json({ error: 'not a valid file.' });
            return;
        }
        res.sendFile(path);
        return;
    }

    public async upload(req: any, res: Response): Promise<void> {
        const files: [{ name: string, path: string, file: string }] = req.body;
        // const file = req.body.file;
        // const name = req.body.name;
        // let path = '/' + Guid.create() + '-' + name;
        files.forEach(f => {
            f.file = f.file.split(',')[1]
        });
        if (!files || !files.length) {
            res.status(400).json({ error: 'no files provided.' });
            return;
        }
        // TODO .replace(/^data:image\/(png|jpg|jpeg)+;base64,/, "")
        let _files: FileViewModel[] = [];
        _files = files.map((f: any) => {
            return {
                buffer: fileUtility.decodeBase64String(f.file),
                path: fileUtility.getWebsiteCdnFolder(f.path + Guid.create() + '-' + f.name, 'file', req.website.name)
            }
        });
        // const [e, r] = await to(fileUtility.saveFile({
        //     buffer: fileUtility.decodeBase64String(file),
        //     path: fileUtility.getWebsiteCdnFolder(path, 'file', req.website.name)
        // }));
        const [e, r] = await to(fileUtility.saveFiles(_files));
        if (e) {
            res.status(500).json({ error: 'Internal Server Error.' });
            return;
        }
        res.json({ message: 'uploaded.' }); // TODO if some files wouldn't have been uploaded
    }

    public async copy(req: any, res: Response): Promise<void> {
        const copies: Copy[] = req.body;
        if (!copies || !copies.length) {
            res.status(400).json({ error: 'no copies provided.' });
            return;
        }
        if (req.user.roles.map((r: any) => r.name).indexOf('administrator') === -1) {
            res.status(401).json({ error: 'access denied.' });
            return;
        }
        copies.forEach(c => {
            c.destination = fileUtility.getWebsiteCdnFolder(c.destination, 'directory', req.website.name) + path.basename(c.source);
            c.source = fileUtility.getWebsiteCdnFolder(c.source, 'file', req.website.name);
            c.isMove
        });
        const [_e, _r] = await to(fileUtility.copyFiles(copies));
        if (_e) {
            res.status(500).json({ error: 'Internal Server Error.' });
            return;
        }
        res.json(_r);
    }

    public async rename(req: any, res: Response): Promise<void> {
        const renames: Copy[] = req.body;
        if (!renames || !renames.length) {
            res.status(400).json({ error: 'no renames provided.' });
            return;
        }
        if (req.user.roles.map((r: any) => r.name).indexOf('administrator') === -1) {
            res.status(401).json({ error: 'access denied.' });
            return;
        }
        renames.forEach(r => {
            r.destination = fileUtility.getWebsiteCdnFolder(r.destination, 'file', req.website.name);
            r.source = fileUtility.getWebsiteCdnFolder(r.source, 'file', req.website.name);
            r.isMove
        });
        const [_e, _r] = await to(fileUtility.copyFiles(renames));
        if (_e) {
            res.status(500).json({ error: 'Internal Server Error.' });
            return;
        }
        res.json(_r);
    }

    public async delete(req: any, res: Response): Promise<void> {
        let files: string[] = req.body;
        if (!files || !files.length) {
            res.status(400).json({ error: 'no files provided.' });
            return;
        }
        if (req.user.roles.map((r: any) => r.name).indexOf('administrator') === -1) {
            res.status(401).json({ error: 'access denied.' });
            return;
        }
        files = files.map(f => 
            fileUtility.getWebsiteCdnFolder(f, 'file', req.website.name)
        );
        const [e, r] = await to(fileUtility.deleteFiles(files));
        if (e) {
            res.status(500).json({ error: 'Internal Server Error.' });
            return;
        }
        res.json(r);
    }

    public async createDirectory(req: any, res: Response): Promise<void> {
        const path: string = req.body.path;
        if (!path) {
            res.status(400).json({ error: 'no file provided.' });
            return;
        }
        const [e, r] = await to(fileUtility.createDirectory(fileUtility.getWebsiteCdnFolder(path, 'directory', req.website.name)));
        if (e) {
            res.status(500).json({ error: 'Internal Server Error.' });
            return;
        }
        res.json(r);
    }

    routes() {
        this.router.get("/getFile", this.getFile);
        this.router.get("/getDirectory", this.getDirectory);
        this.router.get("/download", this.download);
        this.router.post("/upload", this.upload);
        this.router.post("/copy", this.copy);
        this.router.post("/rename", this.rename);
        this.router.post("/delete", this.delete);
        this.router.post("/create-directory", this.createDirectory);
    }
}

const fileRoutes = new FileRouter();
fileRoutes.routes();

export default fileRoutes.router;
