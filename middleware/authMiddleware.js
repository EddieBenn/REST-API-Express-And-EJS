import jwt from 'jsonwebtoken';
import asychHandler from 'express-async-handler';
import cookieParser from 'cookie-parser';
import { findOne } from '../models/userModel';

export const protect = async (req, res, next) => {
    let token
    if(req.cookies.token) {
    try {
            //Get token from cookie
            token = req.cookies.token;
            
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //Get user from token
            req.user = await findOne(decoded.email);

            return next();

        }   catch (error) {
            console.log(error);
            res.status(401);
            res.redirect('/users/login');
            // throw new Error('Not authorized, invalid token')
        }
    }   else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token header
            token = req.headers.authorization.split(' ')[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            req.user = await findOne(decoded.email);

            return next();
        } catch (error) {
            console.log(error);
            res.status(401);
            res.redirect('/users/login');
            // throw new Error('Not authorized, invalid token')
            };
        };

    if(!token) {
    res.status(401);
    res.redirect('/users/login');
    // throw new Error('Not authorized, no token');
    };
};

// export const notProtect = async (req, res, next) => {
//     let token
//     if(req.cookies.token) {
//     try {
//             //Get token from cookie
//             token = req.cookies.token;
            
//             //verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
//             //Get user from token
//             req.user = await findOne(decoded.email);

        
//            return res.redirect('/customers');

//         }   catch (error) {
//             console.log(error);
            
//         }
//     } 
//     return next();
// }