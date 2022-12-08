import { rest } from 'msw';
import * as CONF from 'assets/config';

const reqLoginUser = rest.post(`${CONF.URL}/users/login`, (req, res, ctx) => {
    const { name, password } = req.body;
    global.__TEST__ = { name, password };

    console.log('handler 1 ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            name,
            password
        })
    )
});

const reqGetUsers = rest.get(`/result`, (req, res, ctx) => {
    console.log( 'handler 2 ->', global.__TEST__ );

    return res(
        ctx.status(200),
        ctx.json({
            ...global.__TEST__
        }),
    )
});

const reqClearResults = rest.get(`/clear`, (req, res, ctx) => {
    global.__TEST__ = {};
    console.log( 'handler 3 ->', global.__TEST__ );

    return res(
        ctx.status(200),
        ctx.json({
            ...global.__TEST__
        }),
    )
});

export const handlers = [
    reqLoginUser,
    reqGetUsers,
    reqClearResults
]
