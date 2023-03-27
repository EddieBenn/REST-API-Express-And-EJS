import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import asyncHandler from 'express-async-handler';
import users from '../database/users.json' assert {type: 'json'};
import { findOne, writeToFile } from '../models/userModel';
import { findAll } from '../models/customerModel'


import { cookie } from 'express-validator';


dotenv.config();


export const getRegisterPage = asyncHandler (async (req, res) => {
    res.render('register', { title: 'Register', token: '' });
});

export const getLoginPage = asyncHandler (async (req, res) => {
    res.render('login', { title: 'Login', token: ''});
})

// @description   Register new user
// @route         POST api/users
// @access        Public
export const registerUser = asyncHandler ( async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields')
    }

    // check if user exist
    const userExist = await findOne(email);

    if(userExist) {
        res.status(400)
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const userDetails = {
        name: name,
        email: email,
        password: hashedPassword 
    } 
    users.push(userDetails)
    await writeToFile('../database/users.json', users)
    
    // const token = generateToken(userDetails.email);
   
    // res.cookie('token', token);

    res.status(201).redirect('/users/login');

 
});

// @description   Login a user
// @route         POST api/users/login
// @access        Public
export const loginUser = asyncHandler ( async (req, res, next) => {
    const { email, password } = req.body;

    //check for user email
    const user = await findOne(email);
    if (user === null) {
        return next(null, false, { message: 'No user with that email' })
    }

    if(user && (await bcrypt.compare(password, user.password))) {
        
        const token = generateToken(user.email);
    
        res.cookie("token", token);
        const customers = await findAll();

        res.status(200).render('dashboard', { title: 'Customers', user, customers, token });
        return;
    } else {
            res.status(400)
            next(null, false, { message: 'Incorrect Password' })
            return res.redirect('/users/login')
            // throw new Error('Invalid user details')
        }

});

// @description   Get user data
// @route         GET api/users/me
// @access        Private
export const getMe = asyncHandler ( async (req, res) => {
    const { name, email } = await findOne(req.user.email);

    res.status(200).json({
        name: name,
        email,
    });
});

// @description   Logout a user
// @route         POST api/users/logout
// @access        Public
export const logoutUser = asyncHandler ( async (req, res, next) => {
        
        res.cookie('token', '')
        req.cookies.token = '';
        // res.cookie(req.cookies.token, null) 
        res.status(200).redirect('/users/login');
});

//Generate JWT
const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

/*****************************************************************The End******************************************************************/