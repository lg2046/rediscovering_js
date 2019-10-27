'use strict';

const http = require('http');
const querystring = require('querystring');


const reqDetail = function (req) {
    const method = req.method;
    const url = req.url;

    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);
    const reqContentType = req.headers['content-type'];
    // console.log(`method: ${method}, url: ${url}, path: ${path}, query: ${JSON.stringify(query)}`);
    return {
        method,
        url,
        path,
        query,
        reqContentType,
    }
};

const server = http.createServer((req, res) => {
        // const url = req.url;
        // req.query = querystring.parse(url.split('?')[1]);
        // res.end(JSON.stringify(req.query));
        //
        // console.log(`url: ${url}`);
        // console.log(`method: ${req.method}`);

        // if (req.method === 'POST') {
        //     console.log('content-type', req.headers['content-type']);
        //
        //     //获取post数据
        //     let postData = "";
        //     req.on('data', chunk => {
        //         postData += chunk.toString();
        //     });
        //
        //     req.on('end', () => {
        //         console.log(postData);
        //         res.end('hello world');
        //     });
        // }

        const resData = reqDetail(req);

        const method = req.method;
        const url = req.url;

        const path = url.split('?')[0];
        const query = querystring.parse(url.split('?')[1]);

        res.setHeader('Content-Type', 'application/json');

        if (method === 'GET') {
            res.end(JSON.stringify(resData));
        }

        if (method === 'POST') {
            let postData = '';
            req.on('data', chunk => postData += chunk);
            req.on('end', () => {
                resData.postData = postData;
                res.end(JSON.stringify(resData));
            });
        }

    }
);


server.listen(3000, () => {
    console.log('listening on 3000 port');
});