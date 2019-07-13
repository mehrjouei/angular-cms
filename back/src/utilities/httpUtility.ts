import * as http from 'http';
import * as https from 'https';
import * as querystring from 'querystring';

export async function post(json: any, host: string, resource: string, headers: any, port = 80, secure = false): Promise<any> {
    return new Promise((resolve, reject) => {
        // if (!headers) {
        //     headers = {
        //         'Content-Type': 'application/json',
        //         'Content-Length': Buffer.byteLength(body)
        //     };
        // }
        const options = {
            host,
            port,
            path: resource,
            method: 'POST',
            headers
        };
        let applicationProtocol: any = null;
        if (!secure) {
            applicationProtocol = http;
        } else {
            applicationProtocol = https;
        }
        const req = applicationProtocol.request(options, (_res: any) => {
            _res.setEncoding('utf8');
            _res.on('data', function (response: any) {
                resolve(response);
            });
            _res.on('end', (response: any) => {
                reject({
                    status: _res.statusCode,
                    message: response
                });
            });
        });
        req.on('error', (e: any) => {
            reject({
                status: 500,
                message: e.message
            });
        });
        if (json) {
            const body = querystring.stringify(json);
            req.write(body);
        }
        req.end();
    })
}

export async function get(params: { [key: string]: string }, host: string, resource: string, headers: any = {}, port = 80, secure = false): Promise<any> {
    return new Promise((resolve, reject) => {
        let queryParams = '';
        if (!headers) {
            headers = {} // some default header
        }
        if (params && params.length) {
            Object.keys(params).forEach(key => {
                queryParams += `&${key}=${params[key]}`;
            });
            queryParams.replace(/^\w/, '?');
        }
        const options = {
            host,
            port,
            path: resource + queryParams,
            method: 'GET',
            headers: headers
        };
        let applicationProtocol: any = null;
        if (!secure) {
            applicationProtocol = http;
        } else {
            applicationProtocol = https;
        }
        const req = applicationProtocol.request(options, function (_res: any) {
            _res.setEncoding('utf8');
            _res.on('data', function (response: any) {
                resolve(response);
            });
            _res.on('end', (response: any) => {
                reject({
                    status: _res.statusCode,
                    message: response
                });
            });
        });
        req.on('error', function (e: any) {
            reject({
                status: 500,
                message: e.message
            });
        });
        req.end();
    })
}