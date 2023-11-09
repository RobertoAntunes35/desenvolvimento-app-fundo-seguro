import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import AuthException from './AuthException.js';

import * as secrets from '../constants/secrets.js'
import * as httpStatus from '../constants/httpStatus.js'

export default async (req, res, next) => {
    try {
        //  pegando a variavel de authenticacao 
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AuthException(
                httpStatus.UNAUTHORIZED,
                "Access token was not informed or is wrong"
                )
        }
        const acessToken = authorization;

        const decoded = await promisify(jwt.verify)(acessToken, secrets.API_SECRET)
        req.authUser = decoded.authUser;
        return next();

    } catch (err) {
        return res.status(err.status).json({
            status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}