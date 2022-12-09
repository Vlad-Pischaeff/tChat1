import { rest } from 'msw';
import * as CONF from 'assets/config';

const reqLoginUser = rest.post(`${CONF.URL}/users/login`, (req, res, ctx) => {
    const { name, password } = req.body;
    global.__TEST__ = { name, password };

    // console.log('handler 1 ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            name,
            password
        })
    )
});

const reqSignupUser = rest.put(`${CONF.URL}/users/register`, (req, res, ctx) => {
    const { name, email, password } = req.body;
    global.__TEST__ = { name, email, password };

    // console.log('handler 1 ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            name,
            email,
            password
        })
    )
});

const reqResetPassword = rest.post(`${CONF.URL}/users/reset`, (req, res, ctx) => {
    const { email } = req.body;
    global.__TEST__ = { email };

    // console.log('handler 1 ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            email
        })
    )
});

const reqGetResult = rest.get(`/result`, (req, res, ctx) => {
    // console.log( 'handler 2 ->', global.__TEST__ );

    return res(
        ctx.status(200),
        ctx.json({
            ...global.__TEST__
        }),
    )
});

const reqClearResults = rest.get(`/clear`, (req, res, ctx) => {
    global.__TEST__ = {};
    // console.log( 'handler 3 ->', global.__TEST__ );

    return res(
        ctx.status(200),
        ctx.json({
            ...global.__TEST__
        }),
    )
});

export const handlers = [
    reqLoginUser,
    reqSignupUser,
    reqResetPassword,
    reqGetResult,
    reqClearResults
]
