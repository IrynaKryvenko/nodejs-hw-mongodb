import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.includes(' ')) {
        return next(createHttpError(401, 'Invalid Authorization header format'));
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    try {
        const session = await SessionsCollection.findOne({ accessToken: token });

        if (!session) {
            return next(createHttpError(401, 'Session not found. Please log in again.'));
        }

        const isAccessTokenExpired = new Date(session.accessTokenValidUntil).getTime() < Date.now();
        if (isAccessTokenExpired) {
            return next(createHttpError(401, 'Access token expired. Please refresh your token.'));
        }

        const user = await UsersCollection.findById(session.userId);
        if (!user) {
            return next(createHttpError(401, 'User associated with this session not found.'));
        }

        req.user = user; // Устанавливаем пользователя в запрос

        if (!req.user?.id) {
            return next(createHttpError(401, 'User not authenticated'));
        }

        next(); // Переход к следующему middleware или контроллеру
    } catch (error) {
        console.error(error); // Логируем ошибку для диагностики
        return next(createHttpError(500, 'Internal Server Error'));
    }
};
