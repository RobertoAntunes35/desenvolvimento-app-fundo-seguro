import jwt from 'jsonwebtoken';

import {promisify} from 'util';

import AuthException from './AuthException.js'

import {API_SECRET} from "../secrets/secrets.js"

import {UNAUTHORIZED, INTERNAL_SERVER_ERROR}  from "../constants/httpStatus.js"

export default async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AuthException(UNAUTHORIZED, 
                "Access token wat not informed")
        }
        const acessToken = authorization;
        // if(acessToken.toLowerCase().includes(emptySpace)) {
            // console.log('TOKEN DE ACESSO ',acessToken)
            // acessToken = acessToken.split(emptySpace)[1]
        // }
        const decoded = await promisify(jwt.verify)(acessToken, API_SECRET)
        req.authUser = decoded.authUser;
        return next();
    }
    catch(err) {
        return res.status(err.status).json({
            status: err.status ? err.status : INTERNAL_SERVER_ERROR,
            message: err.message
        })
    }
}