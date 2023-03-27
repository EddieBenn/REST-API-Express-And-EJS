import customerData from '../database/database.json' assert {type: 'json'};
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sep } from 'path';
// import database from '../../backend/database/database.json'


export const findAll = async () => {
    return customerData;
}
export const findOne = async (email) => {
    const user = customerData.find( (eachCustomer) => eachCustomer.email === email)
    return user;
}

export const findById = async (id) => {
        const customer = customerData.find( (eachCustomer) => eachCustomer.id === id)
        return customer;
}

export const create = async (customer) => {
   
        const newCustomer = {id: uuidv4(), ...customer};
        customerData.push(newCustomer);
        await fs.writeFile(path.join(__dirname,'../database/database.json'), JSON.stringify(customerData, null, 3), 'utf-8', (err) => {
            if (err) {
                console.log(err);
            }
        })
        return newCustomer;
}

export const update = async (id, customer) => {
    try {
        const index = customerData.findIndex((eachCustomer) => eachCustomer.id === id);
        customerData[index] = { id, ...customer };
        await fs.writeFile(path.join(__dirname,'../database/database.json'), JSON.stringify(customerData, null, 3), 'utf-8', (err) => {

            if (err) {
                console.log(err);
            }
        })
        return customerData[index];

    } catch(err) {
        console.log(err)
    }
}

export const remove = async (id) => {
        let newCustomer = customerData.filter((eachCustomer) => eachCustomer.id !== id );
        await fs.writeFile(path.join(__dirname,'../database/database.json'), JSON.stringify(newCustomer, null, 3), 'utf-8', (err) => {
            if (err) {
                console.log(err);
            }
        });
        return newCustomer;
}