import asyncHandler from 'express-async-handler';
import { findOne, findById, findAll, create, remove, update } from '../models/customerModel';

// @description   Gets a customer
// @route         GET /api/customers
// @access        Private 
export const getCustomerById = asyncHandler (async (req, res) => {
    const token = req.cookies.token;
    const id = req.path.split('/')[1];
    const user = await findById(id);    
    
    if (!user) {
            res.status(400)
            throw new Error('Customer not found')
        }

        res.status(200).render('getCustomer', { title: 'Customer', user, token});
});

// @description   Gets Customers
// @route         GET /customers
// @access        Private 
export const getCustomers = asyncHandler (async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        res.status(400).render('login')
    }
    const customers = await findAll();
    res.status(200).render('dashboard', { title: 'Customers', customers, token });

});

// @description   Get Create Customer Page
// @route         GET /customers/add
// @access        Private 
export const getAddCustomerPage = asyncHandler (async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        res.status(401).render('login')
    } else {
        res.status(201).render('addCustomer', { title: 'Add Customer', token });
    }
})

// @description   Create customer
// @route         POST /api/customers
// @access        Private 
export const createCustomer = asyncHandler (async (req, res) => {
        const token = req.cookies.token;
        if (!req.body) {
            res.status(400)
            throw new Error('Please add a text field')
        } 
        const body = await create(req.body)
        const customers = await findAll();
        res.status(201).render('dashboard', { title: 'Customer', customers, token });
});

// @description   Get Update Customer Page
// @route         GET /customers/update:id
// @access        Private 
export const getUpdateCustomerPage = asyncHandler (async (req, res) => {
    const id = req.path.split('/')[2];
    const user = await findById(id);
    const token = req.cookies.token;
    if(!token) {
        res.status(401).render('login')
    } else {
        res.status(200).render('updateCustomer', { title: 'Update Customer', token, user });
    };
});

// @description   Update customer
// @route         PUT /customers/:id
// @access        Private 
export const updateCustomer = asyncHandler (async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    const token = req.cookies.token;
    const userBio = await findById(id);

    if(!userBio) {
        res.status(400)
        throw new Error('Customer not found')
    }

    const { fullname, email, gender, phone, address, notes } = await req.body;
    
    const bodyData = {
        fullname: fullname || userBio.fullname,
        email: email || userBio.email,
        gender: gender || userBio.gender,
        phone: phone || userBio.phone,
        address: address || userBio.address,
        notes: notes || userBio.notes
        }

    const updatedCustomer = await update(id, bodyData);

    const customers = await findAll();
    return res.status(201).render('dashboard', { title: 'Customer', customers, token });

});

// @description   Get Delete Customer Page
// @route         GET /customers/delete:id
// @access        Private 
export const getDeleteCustomerPage = asyncHandler (async (req, res) => {
    const id = req.path.split('/')[2];
    const user = await findById(id);
    const token = req.cookies.token;
    if(!token) {
        res.status(401).render('login')
    } else {
        res.status(200).render('deleteCustomer', { title: 'Delete Customer', token, user });
    };
});

// @description   Delete customer
// @route         DELETE /customers/:id
// @access        Private 
export const deleteCustomer = asyncHandler (async (req, res) => {
    const token = req.cookies.token;
    const id = req.path.split('/')[2];
    const userData = await findById(id);
    if (!userData) {
        res.status(400)
        throw new Error('Customer not found')
    }

    const removeCustomer = await remove(userData.id);

    const customers = await findAll();
    return res.status(200).redirect('/customers');
    // return res.status(201).render('dashboard', { title: 'Customer', customers, token });
});


/*****************************************************************The End******************************************************************/