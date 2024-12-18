import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    try {
        const session = await SessionsCollection.findOne({ accessToken: token });

        if (!session) {
            return next(createHttpError(401, 'Session not found'));
        }

        const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
        if (isAccessTokenExpired) {
            return next(createHttpError(401, 'Access token expired'));
        }

        const user = await UsersCollection.findById(session.userId);
        if (!user) {
            return next(createHttpError(401, 'User not found'));
        }

        req.user = user;  // Здесь устанавливаем req.user

        // Проверяем, что req.user существует и что у него есть _id
        if (!req.user || !req.user._id) {
            return next(createHttpError(401, 'User not authenticated'));
        }

        next();  // Переход к следующему middleware или контроллеру
    } catch  {
        return next(createHttpError(500, 'Internal Server Error'));
    }
};
