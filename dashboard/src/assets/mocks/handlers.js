import { rest } from 'msw';
import * as CONF from 'assets/config';

const reqLoginUser = rest.post(`${CONF.URL}/users/login`, (req, res, ctx) => {
    const { name, password } = req.body;
    global.__TEST__ = { name, password };

    // console.log('handler -> reqLoginUser ->', global.__TEST__);

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

    // console.log('handler -> reqSignupUser ->', global.__TEST__);

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

    // console.log('handler -> reqResetPassword ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            email
        })
    )
});

const reqUpdateUser = rest.patch(`${CONF.URL}/users/:id`, (req, res, ctx) => {
    const { password } = req.body;
    const { id } = req.params;
    global.__TEST__ = { id, password };

    // console.log('handler -> reqUpdateUser ->', global.__TEST__);

    return res(
        ctx.status(200),
        ctx.response({
            id,
            password
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
    reqUpdateUser,
    reqGetResult,
    reqClearResults
]
