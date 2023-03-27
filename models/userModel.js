import users from '../database/users.json' assert {type: 'json'};
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const findOne = async (email) => {
    const user = users.find( (eachUser) => eachUser.email === email)
    return user;
}

export const writeToFile = async (filename, content) => {
    await fs.writeFile(path.join(__dirname, filename), JSON.stringify(content, null, 3), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    })
}
